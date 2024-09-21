import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ArrowRight, Home, Search, Star, Shield } from 'lucide-react'
import FeatureCard from '@/components/ui/feature-card'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Your Perfect Home</h1>
            <p className="text-xl mb-8">Discover a wide range of apartments tailored to your lifestyle</p>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
              <Link href="/apartments">
                View Apartments
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-12 text-gray-800">Why Choose Urban Oasis?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Search className="h-10 w-10 text-primary" />}
                title="Easy Search"
                description="Find your ideal apartment with our intuitive search tools."
              />
              <FeatureCard
                icon={<Star className="h-10 w-10 text-primary" />}
                title="Quality Listings"
                description="Curated selection of high-quality apartments in prime locations."
              />
              <FeatureCard
                icon={<Shield className="h-10 w-10 text-primary" />}
                title="Secure Process"
                description="Safe and transparent booking process for your peace of mind."
              />
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">Ready to Find Your New Home?</h2>
            <p className="text-xl mb-8 text-gray-600">Browse our extensive list of apartments and find the perfect match for you.</p>
            <Button asChild size="lg">
              <Link href="/apartments">
                Start Your Search
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Home className="h-6 w-6" />
              <span className="text-xl font-semibold">Urban Oasis</span>
            </div>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-gray-300">Privacy Policy</Link>
              <Link href="#" className="hover:text-gray-300">Terms of Service</Link>
              <Link href="#" className="hover:text-gray-300">Contact Us</Link>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            © {new Date().getFullYear()} Urban Oasis. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

