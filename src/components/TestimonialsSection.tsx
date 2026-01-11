import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { Link } from "react-router-dom";

const TestimonialsSection = () => {
  const { reviews } = useAdmin();

  const visibleReviews = reviews.filter((review) => review.visible);

  if (visibleReviews.length === 0) return null;

  // Display first 4 reviews in 2x2 grid
  const displayedReviews = visibleReviews.slice(0, 4);

  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-14">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-foreground">
            What Our Clients Say
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto mb-6 rounded-full" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trusted by hundreds of satisfied clients across Bangalore
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {displayedReviews.map((review, index) => (
            <Card
              key={review.id}
              className="bg-secondary p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border-0"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < review.rating
                        ? "fill-accent text-accent"
                        : "text-gray-200"
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

        <div className="text-center">
          <Link to="/reviews">
            <Button className="bg-accent hover:bg-accent/90 text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Read More Reviews
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
