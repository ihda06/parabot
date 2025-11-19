"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Info,
  CheckCircle2,
  Shield,
  Mail,
  Code,
  Github,
  Linkedin,
  Globe,
  MapPin,
  Sparkles,
} from "lucide-react";

export default function About() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for form submission
    console.log("Form submitted:", formData);
    alert("Thank you for your message! (This is a demo form)");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="flex flex-col relative overflow-hidden">
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

      <div className="container mx-auto px-4 py-16 md:py-24 space-y-16 relative">
        {/* Hero Section */}
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm bg-accent/10 border-accent/20 text-accent">
            <Sparkles className="mr-2 h-4 w-4" />
            About ParaBot
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gradient">
            About & Contact
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Learn more about our mission, upcoming features, and get in touch
            with us.
          </p>
        </div>

        {/* About Section */}
        <section className="space-y-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              What is ParaBot?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A collection of free developer tools designed to streamline your
              workflow
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            <Card className="border-accent/20 hover:border-accent/50 transition-all hover:shadow-lg relative backdrop-blur-sm bg-card/50">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Info className="h-5 w-5 text-accent" />
                  </div>
                  <CardTitle className="text-lg">Our Mission</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  ParaBot is a collection of online developer tools designed to
                  streamline your development workflow. Our mission is to
                  provide essential tools that developers need on a daily basis,
                  all in one convenient location.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-accent/20 hover:border-accent/50 transition-all hover:shadow-lg relative backdrop-blur-sm bg-card/50">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Sparkles className="h-5 w-5 text-accent" />
                  </div>
                  <CardTitle className="text-lg">Coming Soon</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Currently, we offer tools for build analysis and parsing. More
                  tools are coming soon, including diff checkers, JSON
                  formatters, and TypeScript converters.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-accent/20 hover:border-accent/50 transition-all hover:shadow-lg relative backdrop-blur-sm bg-card/50 md:col-span-2 lg:col-span-1">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Shield className="h-5 w-5 text-accent" />
                  </div>
                  <CardTitle className="text-lg">Privacy First</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  All tools are free to use and run entirely in your browser. No
                  data is sent to our servers, ensuring your code and build
                  outputs remain private and secure.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Coming Soon Features */}
          <Card className="max-w-4xl mx-auto border-accent/20 bg-linear-to-br from-accent/5 to-transparent relative backdrop-blur-sm mt-12">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-accent" />
                Upcoming Features
              </CardTitle>
              <CardDescription className="text-base">
                Here&apos;s what we&apos;re working on next:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">
                    Diff checker for comparing code changes
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">
                    JSON formatter and validator
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">
                    JSON to TypeScript converter
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">
                    And many more developer utilities
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact Section */}
        <section className="space-y-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Get in Touch
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a question, suggestion, or want to connect? We&apos;d love to
              hear from you!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="border-accent/20 bg-linear-to-br from-accent/5 to-transparent relative backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Mail className="h-6 w-6 text-accent" />
                  Send a Message
                </CardTitle>
                <CardDescription className="text-base">
                  Fill out the form below and I&apos;ll get back to you as soon
                  as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="bg-background/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="bg-background/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Your message..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      rows={6}
                      required
                      className="bg-background/50"
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Creator Info */}
            <Card className="border-accent/20 bg-linear-to-br from-accent/5 to-transparent relative backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Code className="h-6 w-6 text-accent" />
                  About the Creator
                </CardTitle>
                <CardDescription className="text-base">
                  Built with passion by a web developer from Indonesia
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-bold">Ihda Anwari</h3>
                    <p className="text-sm text-muted-foreground font-medium">
                      Web Developer
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 shrink-0" />
                    <span>Bandung, West Java, Indonesia</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <p className="text-sm font-medium text-foreground">
                    Connect with me:
                  </p>
                  <div className="flex flex-col gap-3">
                    <Link
                      href="https://github.com/ihda06"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:border-accent/50 hover:bg-accent/5 transition-all group"
                    >
                      <div className="p-2 rounded-md bg-accent/10 group-hover:bg-accent/20 transition-colors">
                        <Github className="h-5 w-5 text-accent" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">GitHub</p>
                        <p className="text-xs text-muted-foreground">
                          github.com/ihda06
                        </p>
                      </div>
                    </Link>

                    <Link
                      href="https://www.linkedin.com/in/ihda-anwari"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:border-accent/50 hover:bg-accent/5 transition-all group"
                    >
                      <div className="p-2 rounded-md bg-accent/10 group-hover:bg-accent/20 transition-colors">
                        <Linkedin className="h-5 w-5 text-accent" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">LinkedIn</p>
                        <p className="text-xs text-muted-foreground">
                          linkedin.com/in/ihda-anwari
                        </p>
                      </div>
                    </Link>

                    <Link
                      href="https://ihda-anwari.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:border-accent/50 hover:bg-accent/5 transition-all group"
                    >
                      <div className="p-2 rounded-md bg-accent/10 group-hover:bg-accent/20 transition-colors">
                        <Globe className="h-5 w-5 text-accent" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Portfolio</p>
                        <p className="text-xs text-muted-foreground">
                          ihda-anwari.vercel.app
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
