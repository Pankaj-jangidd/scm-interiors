// ===============================
//  WEBSITE REVIEWS PAGE
// ===============================

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReviewCard from "@/components/ReviewCard";
import AddReviewDialog from "@/components/AddReviewDialog";
import { Button } from "@/components/ui/button";
import PageTransition from "@/components/admin/PageTransition";
import { getReviews } from "@/integrations/supabase/reviews";
import { supabase } from "@/integrations/supabase/client";

const Reviews = () => {
  const [showAll, setShowAll] = useState(false);
  const [dbReviews, setDbReviews] = useState<any[]>([]);

  // STATIC REVIEWS
  const staticReviews = [
    { name: "Rajesh Kumar", rating: 5, review: "Outstanding work!" },
    { name: "Priya Sharma", rating: 5, review: "Amazing modular kitchen." },
    { name: "Anil Patel", rating: 5, review: "Great attention to detail." },
    { name: "Meena Reddy", rating: 5, review: "Very professional team." },
    { name: "Suresh Naidu", rating: 5, review: "Stunning renovation work." },
    { name: "Lakshmi Iyer", rating: 5, review: "Beautiful wardrobe design." },
  ];

  // Load Reviews
  const load = async () => {
    try {
      const data = await getReviews(true);

      const normalized = (data || []).map((r: any) => ({
        id: r.id,
        name: r.name ?? "Anonymous",
        rating: Number(r.rating) || 5,
        review: r.text ?? r.review ?? "",
        created_at: r.created_at,
      }));

      normalized.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      setDbReviews(normalized);
    } catch (err) {
      console.error("Load reviews failed:", err);
    }
  };

  useEffect(() => {
    load();

    // Realtime Listener
    const channel = supabase
      .channel("realtime:reviews")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "reviews" },
        () => load()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const allReviews = [...dbReviews, ...staticReviews];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* HERO */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url("https://res.cloudinary.com/dp8syhcsf/image/upload/f_auto,q_auto,w_1200,h_700,c_fill/v1763230594/review_jhpjuz.jpg")`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto animate-fade-in">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Our Happy Customers
          </h1>
          <p className="text-lg md:text-xl font-light text-white/90">
            Our work ends only when your satisfaction begins
          </p>
        </div>
      </section>

      <PageTransition>
        {/* INTRO SECTION */}
        <section className="py-12 md:py-16 bg-secondary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Hear what our clients say
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto mb-6 rounded-full" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stories of trust, satisfaction, and beautifully transformed
              spaces.
            </p>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto mb-12">
              {allReviews.slice(0, 4).map((review, index) => (
                <div
                  key={review.id ?? index}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ReviewCard {...review} />
                </div>
              ))}

              {!showAll && allReviews.length > 4 && (
                <div className="col-span-full relative">
                  <div className="absolute inset-0 backdrop-blur-md bg-white/60 z-10 rounded-xl" />
                  <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <Button
                      onClick={() => setShowAll(true)}
                      size="lg"
                      className="bg-accent hover:bg-accent/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      Read More
                    </Button>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6 blur-sm pointer-events-none">
                    {allReviews.slice(4, 6).map((review, index) => (
                      <div key={index + 4}>
                        <ReviewCard {...review} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {showAll &&
                allReviews.map((review, index) => (
                  <div
                    key={review.id ?? index}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <ReviewCard {...review} />
                  </div>
                ))}
            </div>

            <div className="text-center">
              <AddReviewDialog />
            </div>
          </div>
        </section>
      </PageTransition>

      <Footer />
    </div>
  );
};

export default Reviews;
