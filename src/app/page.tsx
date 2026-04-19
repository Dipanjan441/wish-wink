import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { InfiniteCarousel } from '@/components/ui/InfiniteCarousel';
import { FEATURES, PRICING_PLANS, SUBTITLE } from '@/constants/landingPageConstants';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* --- HERO SECTION --- */}
      <section className="relative sm:px-4 pt-20 pb-16 flex flex-col items-center text-center overflow-hidden">
        {/* Floating Background Particles */}
        <div className="absolute top-10 left-10 animate-float text-4xl">🎈</div>
        <div className="absolute top-70 right-10 animate-float text-4xl" style={{ animationDelay: '1s' }}>✨</div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full mb-6 border border-secondary/20 shadow-sm">
            <Sparkles className="w-4 h-4 text-primary animate-twinkle" />
            <span className="text-xs font-bold uppercase tracking-widest text-muted">New: AI Wish Assistant</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            Send a <span className="font-cute text-primary">Smile</span>, <br />
            One Wink at a Time.
          </h1>

          <p className="text-lg text-muted mb-10 font-medium max-w-md mx-auto">
            {SUBTITLE}
          </p>

          <Link href="/create" className="primary-button max-w-xs mx-auto">
            Create a Wish Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Hero Visual: A "card carousel" Preview */}
        <InfiniteCarousel />
      </section>

      {/* --- FEATURES / TIERS --- */}
      <section className="bg-white/40 backdrop-blur-md py-20 px-6 rounded-t-[3rem]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-3xl font-black mb-12">Why Choose WishWink?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {
              FEATURES.map((feature) => (
                <div key={feature.title} className="p-6 text-center">
                  <div className="icon-container">
                    {feature.icon && <feature.icon className="w-6 h-6" />}
                  </div>
                  <h3 className="font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted">{feature.description}</p>
                </div>
              ))
            }
          </div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section className=" py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black mb-12">Choose Your Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRICING_PLANS.map((plan) => (
              <div key={plan.name} className="bg-white px-4 py-8 rounded-lg shadow-lg border border-primary flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-2xl font-black text-primary mb-4">{plan.cost}</p>
                  <p className="text-muted mb-4">{plan.description}</p>
                  <ul className="text-sm text-muted mb-6 space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                </div>
                <Link href="/pricing" className="primary-button">
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}