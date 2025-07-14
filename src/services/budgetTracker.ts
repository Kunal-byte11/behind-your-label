interface UsageData {
  totalCost: number;
  requestCount: number;
  lastReset: string;
  dailyLimit: number;
}

export class BudgetTracker {
  private storageKey: string;
  private budgetLimit: number;
  private dailyLimit: number;

  constructor() {
    this.storageKey = import.meta.env.VITE_USAGE_STORAGE_KEY || 'byl_gemini_usage';
    this.budgetLimit = parseFloat(import.meta.env.VITE_GEMINI_BUDGET_LIMIT || '0.50');
    this.dailyLimit = 20; // Max 20 requests per day for free users
  }

  // Estimate cost based on Gemini pricing
  estimateCost(inputText: string, outputText: string): number {
    // Rough token estimation (1 token ≈ 4 characters)
    const inputTokens = Math.ceil(inputText.length / 4);
    const outputTokens = Math.ceil(outputText.length / 4);

    // Gemini 1.5 Flash pricing (as of 2024)
    // Input: $0.075 per 1M tokens
    // Output: $0.30 per 1M tokens
    const inputCost = (inputTokens * 0.075) / 1000000;
    const outputCost = (outputTokens * 0.30) / 1000000;

    return inputCost + outputCost;
  }

  // Get current usage data
  getUsageData(): UsageData {
    const stored = localStorage.getItem(this.storageKey);
    const today = new Date().toDateString();

    if (!stored) {
      return {
        totalCost: 0,
        requestCount: 0,
        lastReset: today,
        dailyLimit: this.dailyLimit
      };
    }

    const data: UsageData = JSON.parse(stored);
    
    // Reset daily count if it's a new day
    if (data.lastReset !== today) {
      data.requestCount = 0;
      data.lastReset = today;
      this.saveUsageData(data);
    }

    return data;
  }

  // Save usage data
  private saveUsageData(data: UsageData): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  // Check if user can make a request
  canMakeRequest(): { allowed: boolean; reason?: string; remaining?: number } {
    const usage = this.getUsageData();

    // Check budget limit
    if (usage.totalCost >= this.budgetLimit) {
      return {
        allowed: false,
        reason: 'budget_exceeded',
        remaining: 0
      };
    }

    // Check daily request limit
    if (usage.requestCount >= this.dailyLimit) {
      return {
        allowed: false,
        reason: 'daily_limit_exceeded',
        remaining: 0
      };
    }

    return {
      allowed: true,
      remaining: this.dailyLimit - usage.requestCount
    };
  }

  // Track a request
  trackRequest(inputText: string, outputText: string): void {
    const cost = this.estimateCost(inputText, outputText);
    const usage = this.getUsageData();

    usage.totalCost += cost;
    usage.requestCount += 1;

    this.saveUsageData(usage);
  }

  // Get usage stats for display
  getUsageStats(): {
    totalCost: number;
    budgetLimit: number;
    requestCount: number;
    dailyLimit: number;
    percentageUsed: number;
    remainingRequests: number;
  } {
    const usage = this.getUsageData();
    
    return {
      totalCost: usage.totalCost,
      budgetLimit: this.budgetLimit,
      requestCount: usage.requestCount,
      dailyLimit: this.dailyLimit,
      percentageUsed: (usage.totalCost / this.budgetLimit) * 100,
      remainingRequests: Math.max(0, this.dailyLimit - usage.requestCount)
    };
  }

  // Reset usage (for testing or admin)
  resetUsage(): void {
    localStorage.removeItem(this.storageKey);
  }
}

export const budgetTracker = new BudgetTracker();