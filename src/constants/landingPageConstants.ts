import { Gift, Star, Zap } from "lucide-react";

export const SUBTITLE = "The modern way to share love. Create beautiful, AI-powered wish cards for your favorite people instantly.";

//heros ection feature part currently desgin to recieve 3 features
export const FEATURES = [
    {
        title: "Instant AI Suggestions",
        description: "Never run out of words. Our AI writes the perfect message for you.",
        icon: Zap
    },
    {
        title: "Premium Themes",
        description: "Pro Feature: Unlock exclusive 3D and animated themes.",
        icon: Star
    },
    {
        title: "Unlimited Sharing",
        description: "Share via WhatsApp, Instagram, or a unique link for free.",
        icon: Gift
    }
];

//pricing plans
export const PRICING_PLANS = [
    {
        name: "Free",
        description: "Basic features for personal use.",
        features: [
            "Create unlimited cards",
            "Basic themes",
            "Premium themes (limited selection)",
            "Explore several categories of cards",
            "AI-generated cards (3 cards per month)",
            "Create unlimited cards manually",
            "Sharable link for your cards"
        ],
        cost: "₹0",
        cta: "Get Started for Free"
    },
    {
        name: "Pro",
        description: "Advanced features for enthusiasts.",
        features: [
            "Everything in Free",
            "All premium themes",
            "Explore all categories",
            "AI-generated cards",
            "Message suggestions",
            "Wish suggestions",
            "Downloadable cards",
            "Sharable link"
        ],
        cost: "₹99/month",
        cta: "Upgrade"
    },
    {
        name: "Premium",
        description: "All features for professionals.",
        features: [
            "Everything in Pro",
            "Unlimited sharing",
            "Priority support",
            "Custom branding",
            "Advanced analytics",
            "Team collaboration",
        ],
        cost: "₹499/month",
        cta: "Get Started"
    },
];