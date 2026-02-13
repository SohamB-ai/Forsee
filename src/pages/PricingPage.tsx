import { Pricing, PricingPlan } from "@/components/ui/pricing";
import RainingLettersBackground from "@/components/ui/raining-letters-background";

const DEMO_PLANS: PricingPlan[] = [
    {
        name: "Starter",
        price: "1249",
        yearlyPrice: "12490",
        period: "per month",
        features: ["can access both roles - viewer and engineer", "3 Devices", "5 Past History", "5GB Data History Storage", "Basic Support"],
        description: "Perfect for individuals and small projects",
        buttonText: "Get Started",
        href: "/future-scalability",
        isPopular: false,
    },
    {
        name: "Pro",
        price: "1849",
        yearlyPrice: "18490",
        period: "per month",
        features: ["can access both roles - viewer and engineer", "5 Devices", "10 Past History", "15GB Data History Storage", "Special Support"],
        description: "Ideal for growing teams",
        buttonText: "Upgrade to Pro",
        href: "/future-scalability",
        isPopular: true,
    },
    {
        name: "Enterprise",
        price: "11699",
        yearlyPrice: "90990",
        period: "per month",
        features: ["can access both roles - viewer and engineer", "Unlimited Devices", "Unlimited Past History", "Unlimited Data Storage", "Special Support"],
        description: "For large organizations",
        buttonText: "Contact Sales",
        href: "/future-scalability",
        isPopular: false,
    }
];

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-background pt-20 relative overflow-hidden transition-colors duration-500">
            <RainingLettersBackground />
            <div className="relative z-10">
                <Pricing
                    title="Choose Your Perfect Plan"
                    description="Choose the plan that works for you. All plans include access to our platform, lead generation tools, and dedicated support."
                    plans={DEMO_PLANS}
                />
            </div>
        </div>
    );
};
