import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";

const TestimonialsSection = () => {
  const { reviews } = useAdmin();

  const visibleReviews = reviews.filter((review) => review.visible);

  if (visibleReviews.length === 0) return null;

  // Display first 4 reviews in 2x2 grid
  const displayedReviews = visibleReviews.slice(0, 4);

  return (
    <section
      id="testimonials"
      className="lg:h-[calc(100vh-71px)] flex flex-col justify-center py-24 md:py-32 bg-secondary/50 scroll-mt-[72px] overflow-hidden"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-gray-950">
            Testimonials
          </h2>
          <div className="w-16 h-1 bg-[#6B7C59] mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedReviews.map((review, index) => (
            <Card
              key={review.id}
              className="bg-card p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-border/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < review.rating
                        ? "fill-[#C9A96E] text-[#C9A96E]"
                        : "text-border"
                    }`}
                  />
                ))}
              </div>
              <p className="text-base text-muted-foreground mb-5 line-clamp-4 leading-relaxed italic">
                "{review.text}"
              </p>
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground">{review.name}</p>
                <p className="text-sm text-muted-foreground">
                  {review.projectType}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
