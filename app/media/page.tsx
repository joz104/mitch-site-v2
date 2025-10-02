import Image from 'next/image'
import Link from 'next/link'

export default function MediaPage() {
  const newsItems = [
    {
      title: 'Record-Breaking Year: 5,000+ Youth Trained in 2024',
      date: 'December 15, 2024',
      category: 'Impact',
      excerpt: 'Mitch\'s Soccer NEXT reaches milestone, providing soccer education to over 5,000 young athletes through innovative pay-what-you-can programs.',
      image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80',
    },
    {
      title: 'Awareness Tour Reaches 20 Communities',
      date: 'November 10, 2024',
      category: 'Programs',
      excerpt: 'Our mobile soccer clinic brings free training and equipment to underserved areas, creating opportunities for hundreds of children.',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
    },
    {
      title: 'New Coach Development Partnership Announced',
      date: 'October 5, 2024',
      category: 'Coaching',
      excerpt: 'Strategic partnership with national coaching organization to expand professional development opportunities for local coaches.',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80',
    },
    {
      title: 'Summer Camp Program Expands to Three Locations',
      date: 'September 1, 2024',
      category: 'Programs',
      excerpt: 'Due to overwhelming demand, we\'re adding two new camp locations to serve more families across the region.',
      image: 'https://images.unsplash.com/photo-1577223625816-7546f2be2066?w=800&q=80',
    },
    {
      title: 'Community Champions: Success Stories from Our Programs',
      date: 'August 20, 2024',
      category: 'Impact',
      excerpt: 'Highlighting the incredible journeys of players who have grown through our training programs and given back to their communities.',
      image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80',
    },
    {
      title: 'Scholarship Fund Reaches $100K Milestone',
      date: 'July 15, 2024',
      category: 'Fundraising',
      excerpt: 'Thanks to generous donors, our scholarship fund now ensures 100% of participants can access quality soccer education.',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1920&q=80"
            alt="Media and news"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-black"></div>
          <div className="absolute inset-0 gradient-purple-overlay" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <h1 className="font-display font-extrabold text-4xl md:text-6xl text-white mb-4">
            News & Media
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Latest updates, press coverage, and community highlights
          </p>
        </div>
      </section>

      {/* Featured Story */}
      <section className="section">
        <div className="container-custom">
          <div className="mb-16">
            <div className="bg-gradient-to-br from-dark-800 to-dark-700 border-2 border-gray-800 rounded-3xl overflow-hidden shadow-2xl hover:border-gray-700 transition-all duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <Image
                    src={newsItems[0].image}
                    alt={newsItems[0].title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="badge badge-info mb-4 self-start">Featured Story</span>
                  <h2 className="font-display font-bold text-3xl text-white mb-4">
                    {newsItems[0].title}
                  </h2>
                  <p className="text-sm text-gray-400 mb-4">{newsItems[0].date}</p>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {newsItems[0].excerpt}
                  </p>
                  <div>
                    <button className="btn btn-primary">
                      Read Full Story
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent News Grid */}
          <div>
            <h2 className="font-display font-bold text-3xl text-white mb-8">Recent News</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsItems.slice(1).map((item, index) => (
                <div key={index} className="card group">
                  <div className="relative h-48 -m-6 mb-4 overflow-hidden rounded-t-2xl">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  </div>

                  <span className="badge badge-info mb-3">{item.category}</span>
                  <h3 className="font-display font-semibold text-xl text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3">{item.date}</p>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {item.excerpt}
                  </p>
                  <button className="text-electric-purple-400 font-semibold hover:text-electric-purple-300 transition-colors flex items-center gap-2 group-hover:gap-3">
                    Read More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Media CTA */}
      <section className="section bg-gradient-to-br from-black via-dark-900 to-black">
        <div className="container-custom text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-6">
            Follow Our Journey
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Stay connected on social media for daily updates, photos, and stories from our programs
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="https://facebook.com/mitchssoccer2.0"
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 bg-electric-purple-500/10 border-2 border-gray-800 rounded-xl flex items-center justify-center text-electric-purple-400 hover:bg-electric-purple-500/20 hover:border-electric-purple-500/40 hover:scale-110 transition-all duration-300"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://instagram.com/mitchssoccer2.0"
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 bg-electric-purple-500/10 border-2 border-gray-800 rounded-xl flex items-center justify-center text-electric-purple-400 hover:bg-electric-purple-500/20 hover:border-electric-purple-500/40 hover:scale-110 transition-all duration-300"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
