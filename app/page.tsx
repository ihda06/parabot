import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Zap,
  Shield,
  Code,
  BarChart3,
  Sparkles,
  Github,
  Linkedin,
  Globe,
  MapPin,
} from "lucide-react";

const tools = [
  {
    name: "Build Parser & Analyzer",
    href: "/tools/build-parser",
    description:
      "Parse and analyze Next.js build output to understand route sizes, bundle distribution, and get optimization recommendations.",
    icon: BarChart3,
  },
];

const features = [
  {
    title: "100% Free",
    description:
      "All tools are completely free to use. No hidden costs, no subscriptions.",
    icon: Zap,
  },
  {
    title: "Privacy First",
    description:
      "All processing happens in your browser. Your data never leaves your device.",
    icon: Shield,
  },
  {
    title: "No Installation",
    description:
      "Use all tools directly in your browser. No downloads or setup required.",
    icon: Code,
  },
  {
    title: "Open Source",
    description:
      "Built with transparency. Check out our code and contribute on GitHub.",
    icon: Sparkles,
  },
];

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ParaBot",
    description:
      "Free online developer tools collection. Analyze, parse, format, and optimize your code. All tools run in your browser - no data sent to servers.",
    url: "https://parabot.dev",
    author: {
      "@type": "Person",
      name: "Ihda Anwari",
      jobTitle: "Web Developer",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bandung",
        addressRegion: "West Java",
        addressCountry: "ID",
      },
      sameAs: [
        "https://github.com/ihda06",
        "https://www.linkedin.com/in/ihda-anwari",
        "https://ihda-anwari.vercel.app/",
      ],
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://parabot.dev/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <div className="flex flex-col relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 grid-pattern" />

        {/* Animated Dots */}
        <div className="absolute inset-0 animated-dots" />

        {/* Gradient Orbs */}
        <div
          className="gradient-orb bg-accent"
          style={{
            width: "600px",
            height: "600px",
            top: "-300px",
            left: "-300px",
          }}
        />
        <div
          className="gradient-orb bg-accent"
          style={{
            width: "500px",
            height: "500px",
            bottom: "-250px",
            right: "-250px",
            animationDelay: "10s",
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative">
        <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm bg-accent/10 border-accent/20 text-accent">
            <Sparkles className="mr-2 h-4 w-4" />
            Free Developer Tools Collection
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gradient">
            Essential Tools for
            <br />
            Modern Developers
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
            A curated collection of powerful, free developer tools to help you
            analyze, parse, and optimize your development workflow. All tools
            run in your browser—no data sent to servers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="#tools">
                Explore Tools
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8"
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 relative">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Why Choose ParaBot?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built with developers in mind, focusing on privacy, performance, and
            ease of use.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="border-accent/20 hover:border-accent/50 transition-all hover:shadow-lg relative backdrop-blur-sm bg-card/50"
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Tools Section */}
      <section
        id="tools"
        className="container mx-auto px-4 py-16 md:py-24 relative"
      >
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Available Tools
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our collection of developer tools designed to streamline
            your workflow.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link key={tool.href} href={tool.href}>
                <Card className="group hover:border-accent/50 transition-all cursor-pointer h-full rounded-lg hover:shadow-lg relative backdrop-blur-sm bg-card/50">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                          <Icon className="h-5 w-5 text-accent" />
                        </div>
                        <CardTitle className="text-xl font-semibold group-hover:text-accent transition-colors">
                          {tool.name}
                        </CardTitle>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors mt-1" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {tool.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Creator Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 relative">
        <Card className="max-w-4xl mx-auto border-accent/20 bg-linear-to-br from-accent/5 to-transparent relative backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-2">
              <Code className="h-8 w-8 text-accent" />
              About the Creator
            </CardTitle>
            <CardDescription className="text-lg">
              Built with passion by a web developer from Indonesia
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-3">
              <div>
                <h3 className="text-2xl font-bold">Ihda Anwari</h3>
                <p className="text-muted-foreground font-medium">
                  Web Developer
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>Bandung, West Java, Indonesia</span>
              </div>
            </div>

            <div className="pt-6 border-t">
              <p className="text-center text-sm font-medium text-foreground mb-4">
                Connect with me:
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="https://github.com/ihda06"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border/50 hover:border-accent/50 hover:bg-accent/5 transition-all group"
                >
                  <Github className="h-5 w-5 text-accent" />
                  <span className="text-sm font-medium">GitHub</span>
                </Link>

                <Link
                  href="https://www.linkedin.com/in/ihda-anwari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border/50 hover:border-accent/50 hover:bg-accent/5 transition-all group"
                >
                  <Linkedin className="h-5 w-5 text-accent" />
                  <span className="text-sm font-medium">LinkedIn</span>
                </Link>

                <Link
                  href="https://ihda-anwari.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border/50 hover:border-accent/50 hover:bg-accent/5 transition-all group"
                >
                  <Globe className="h-5 w-5 text-accent" />
                  <span className="text-sm font-medium">Portfolio</span>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 relative">
        <Card className="max-w-4xl mx-auto border-accent/20 bg-linear-to-br from-accent/10 to-transparent relative backdrop-blur-sm">
          <CardContent className="py-12 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our tools and start optimizing your development workflow
              today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="#tools">
                  Browse Tools
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8"
              >
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
