import Link from 'next/link';
import { ArrowRight, BookOpen, Users, TrendingUp, Award } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-b from-background to-card">
        <div className="container mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Learn Without Limits
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-muted-foreground">
              Access world-class education anytime, anywhere. Learn from industry experts and advance your career with our comprehensive learning platform.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/dashboard/register"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-6 py-3 text-base font-medium text-foreground hover:bg-muted transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-b border-border py-20 sm:py-32">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Why Choose EduLearn?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to learn and grow
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: BookOpen,
                title: 'Expert Content',
                description: 'Learn from industry professionals with years of experience'
              },
              {
                icon: Users,
                title: 'Community',
                description: 'Connect with thousands of learners worldwide'
              },
              {
                icon: TrendingUp,
                title: 'Track Progress',
                description: 'Monitor your learning journey with detailed analytics'
              },
              {
                icon: Award,
                title: 'Certifications',
                description: 'Earn recognized certificates upon course completion'
              }
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 transition-colors">
                  <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-border bg-card py-20 sm:py-32">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { stat: '10K+', label: 'Active Students' },
              { stat: '500+', label: 'Expert Instructors' },
              { stat: '1000+', label: 'Courses Available' }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl font-bold text-primary">{item.stat}</div>
                <div className="mt-2 text-sm text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="pricing" className="py-20 sm:py-32">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-border bg-gradient-to-r from-primary/5 to-accent/5 p-8 sm:p-12 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Start Learning?
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground mb-8">
              Join thousands of students taking their next step in their education journey.
            </p>
            <Link
              href="/dashboard/register"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Sign Up Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
