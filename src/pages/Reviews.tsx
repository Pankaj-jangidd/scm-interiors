import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ReviewCard from '@/components/ReviewCard';

const Reviews = () => {
  const allReviews = [
    {
      name: 'Rajesh Kumar',
      rating: 5,
      review:
        'Outstanding work! The team transformed our home beautifully. Very professional and delivered on time. The attention to detail was remarkable.',
    },
    {
      name: 'Priya Sharma',
      rating: 5,
      review:
        'Excellent modular kitchen design. The quality of materials and finish is top-notch. Highly recommended! They made the entire process smooth and stress-free.',
    },
    {
      name: 'Anil Patel',
      rating: 5,
      review:
        'Great attention to detail. The false ceiling work was done perfectly. Very satisfied with the results and the professionalism of the team.',
    },
    {
      name: 'Meena Reddy',
      rating: 5,
      review:
        'Professional team and excellent craftsmanship. They understood our requirements perfectly and delivered beyond our expectations.',
    },
    {
      name: 'Suresh Naidu',
      rating: 5,
      review:
        'Best interior designers in Bangalore! They renovated our entire apartment and it looks stunning. Great work on the furniture and paint.',
    },
    {
      name: 'Lakshmi Iyer',
      rating: 5,
      review:
        'Very happy with the wardrobe design and execution. The team was courteous and finished the work within the promised timeline.',
    },
    {
      name: 'Vikram Singh',
      rating: 5,
      review:
        'Exceptional quality and reasonable pricing. The modular kitchen they designed for us is both functional and beautiful. Highly satisfied!',
    },
    {
      name: 'Divya Ramesh',
      rating: 5,
      review:
        'SCM Interiors did a fantastic job with our office renovation. Professional approach and excellent finishing work. Would definitely recommend.',
    },
    {
      name: 'Karthik Rao',
      rating: 5,
      review:
        'Outstanding craftsmanship! They helped us design a beautiful pooja room and TV unit. The wood work quality is excellent.',
    },
    {
      name: 'Anjali Desai',
      rating: 5,
      review:
        'Very impressed with their professionalism. The false ceiling and lighting design transformed our living room completely. Thank you!',
    },
    {
      name: 'Madhav Kulkarni',
      rating: 5,
      review:
        'Best decision we made for our home interiors. The team was responsive, creative, and delivered exceptional results within budget.',
    },
    {
      name: 'Preeti Joshi',
      rating: 5,
      review:
        'Excellent service from start to finish. They helped us with complete interior design including painting, furniture, and false ceiling. Highly recommended!',
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Page Header */}
      <section className="py-16 md:py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Our Happy Customers
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear what our clients say about their experience with Sri Chamundeshwari Interiors.
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full" />
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {allReviews.map((review, index) => (
              <div
                key={index}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <ReviewCard {...review} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Reviews;
