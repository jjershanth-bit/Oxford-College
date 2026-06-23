import { Link, useNavigate } from 'react-router';
import { ShoppingCart, ArrowRight, Trash2, ShieldCheck, HelpCircle } from 'lucide-react';
import HeroBanner from '@/components/HeroBanner';
import { useApp } from '@/context/AppContext';
import { programs } from '@/data/programs';
import { toast } from 'sonner';
import { useState } from 'react';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, checkout, currentUser } = useApp();
  const [isProcessing, setIsProcessing] = useState(false);

  // 1. Resolve cart program objects
  const cartItems = cart
    .map((slug) => programs.find((p) => p.slug === slug))
    .filter((p): p is typeof programs[0] => p !== undefined);

  // 2. Parse price helper
  const getNumericPrice = (priceStr: string) => {
    return parseFloat(priceStr.replace(/,/g, ''));
  };

  // 3. Compute Totals
  const subtotal = cartItems.reduce((acc, item) => acc + getNumericPrice(item.price), 0);
  const total = subtotal;

  const handleCheckout = () => {
    if (!currentUser) {
      toast.info('Please sign in or create an account to finalize your enrollment.');
      navigate('/account');
      return;
    }

    setIsProcessing(true);
    // Simulate system enrollment network delay for premium feel
    setTimeout(() => {
      const success = checkout();
      setIsProcessing(false);
      if (success) {
        toast.success('Registration Complete!', {
          description: 'You are now officially enrolled in your selected programs.',
        });
        navigate('/account');
      } else {
        toast.error('Enrollment failed. Please try again.');
      }
    }, 1500);
  };

  return (
    <main className="bg-gray-50 min-h-screen pb-20">
      <HeroBanner
        title="Shopping Cart"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Cart' },
        ]}
        backgroundImage="/images/hero-programs.jpg"
      />

      <section className="py-16">
        <div className="content-max-width px-4 md:px-5">
          {cartItems.length === 0 ? (
            /* Empty State */
            <div className="text-center bg-white rounded-2xl border border-gray-150 py-16 px-6 max-w-lg mx-auto shadow-sm">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart size={32} className="text-gray-400" />
              </div>
              <h2 className="font-heading text-xl font-bold text-brand-dark mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-text font-light text-sm mb-8">
                Browse our curriculum offerings, select your programs, and add them to your cart to begin your academic training.
              </p>
              <Link to="/programs" className="btn-primary inline-flex items-center gap-2 rounded-xl">
                Browse Programs
                <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            /* Active Cart Grid */
            <div className="flex flex-col lg:flex-row gap-10">
              {/* Left Column - Cart Table */}
              <div className="lg:w-[65%] space-y-6">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-heading font-semibold text-brand-dark">
                      Selected Programs ({cartItems.length})
                    </h3>
                  </div>

                  {/* Responsive Cart List */}
                  <div className="divide-y divide-gray-100">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5"
                      >
                        {/* Course Image */}
                        <div className="w-full sm:w-28 aspect-[16/10] sm:h-18 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Title & Details */}
                        <div className="flex-1 min-w-0">
                          <Link
                            to={`/programs/${item.slug}`}
                            className="font-heading text-sm md:text-base font-semibold text-brand-dark hover:text-brand-blue transition-colors line-clamp-2"
                          >
                            {item.title}
                          </Link>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-text font-light mt-1.5">
                            <span className="bg-gray-100 text-brand-dark px-2 py-0.5 rounded text-[10px] font-medium">
                              {item.category}
                            </span>
                            <span>Duration: {item.duration}</span>
                          </div>
                        </div>

                        {/* Pricing & Removal */}
                        <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                          <div className="font-heading text-brand-dark font-bold">
                            රු {item.price}
                          </div>
                          <button
                            onClick={() => {
                              removeFromCart(item.slug);
                              toast.info('Item removed from cart');
                            }}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center px-4">
                  <Link to="/programs" className="text-sm text-brand-blue hover:underline font-semibold flex items-center gap-1.5">
                    ← Add more programs
                  </Link>
                </div>
              </div>

              {/* Right Column - Order Summary Card */}
              <div className="lg:w-[35%]">
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6 lg:sticky lg:top-24">
                  <h3 className="font-heading font-semibold text-brand-dark border-b border-gray-100 pb-4">
                    Summary of Fees
                  </h3>

                  <div className="space-y-3 text-sm font-light text-gray-text">
                    <div className="flex justify-between">
                      <span>Tuition Subtotal</span>
                      <span className="font-semibold text-brand-dark">රු {subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Registration Fees</span>
                      <span className="text-green-600 font-medium">FREE</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Course Materials</span>
                      <span className="text-green-600 font-medium">INCLUDED</span>
                    </div>
                    <div className="border-t border-gray-200/60 pt-4 mt-2 flex justify-between text-base">
                      <span className="font-semibold text-brand-dark">Total Fee</span>
                      <span className="font-heading font-bold text-brand-dark text-lg">
                        රු {total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    disabled={isProcessing}
                    className="w-full py-4 bg-brand-blue text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 hover:bg-opacity-95 shadow-md shadow-brand-blue/15 hover:scale-[1.01] flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:scale-100"
                  >
                    {isProcessing ? (
                      <>
                        <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        PROCESSING ENROLLMENT...
                      </>
                    ) : (
                      <>
                        CONFIRM ENROLLMENT
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>

                  {/* Security badge and notices */}
                  <div className="border-t border-gray-100 pt-4 space-y-3">
                    <div className="flex gap-2.5 items-start text-xs text-gray-text font-light leading-normal">
                      <ShieldCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span>
                        Secure transaction. Enrollments are processed instantly. Stored locally in student account databases.
                      </span>
                    </div>
                    <div className="flex gap-2.5 items-start text-xs text-gray-text font-light leading-normal">
                      <HelpCircle className="w-5 h-5 text-brand-blue flex-shrink-0" />
                      <span>
                        Need help? Contact college administration on WhatsApp for payment plans and queries.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
