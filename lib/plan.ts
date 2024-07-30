
export interface Plan {
    name: string;
    features: string[];
    price? : string;
}

// plan details
// ** Add/Remove/Change plan detail below **
// will change content of  plans later

export const plans: Plan[] = [
    {
        name: "Free Version",
        features: [
            "One Calendar per account",
            "Fill up to 20% capacity",
            "Static Event Names and Details",
            "Fill up to two weeks at a time"
        ]
    },
    {
        name: "AwayMe - Lifetime Subscription",
        features: [
          "One-time payment",
          "Unlimited Calendars per Account",
          "Fill up to 100% capacity",
          "Random Event Names and Details",
          "Fill up to 12 months at a time",
          "Lifetime access"
        ],
        price: "CAD $70.00"
      },
      {
        name: "AwayMe - Professional - Monthly",
        features: [
          "Monthly subscription",
          "Up to 3 Calendars per Account",
          "Fill up to 100% capacity",
          "Random Event Names and Details",
          "Fill up to 2 months at a time"
        ],
        price: "CAD $8.00 per month"
      },
      {
        name: "AwayMe - Professional - Annual",
        features: [
          "Annual subscription",
          "Up to 3 Calendars per Account",
          "Fill up to 100% capacity",
          "Random Event Names and Details",
          "Fill up to 2 months at a time"
        ],
        price: "CAD $50.00 per year"
      }
];
