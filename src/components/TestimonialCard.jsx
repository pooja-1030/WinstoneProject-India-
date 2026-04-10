import { Quote, Star } from 'lucide-react';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-luxury-dark border border-gray-800 p-8 hover:border-gold transition-all duration-300 group">
      <div className="flex items-start gap-4 mb-6">
        <div className="text-gold opacity-50 group-hover:opacity-100 transition-opacity">
          <Quote size={32} />
        </div>
        {testimonial.rating && (
          <div className="flex gap-1 ml-auto">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} size={16} className="fill-gold text-gold" />
            ))}
          </div>
        )}
      </div>

      <p className="text-gray-300 text-base leading-relaxed mb-6 italic">
        "{testimonial.testimonial}"
      </p>

      <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
        {testimonial.avatar ? (
          <img 
            src={testimonial.avatar} 
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center text-luxury-black font-bold text-lg">
            {testimonial.name.charAt(0)}
          </div>
        )}
        <div>
          <h4 className="text-white font-semibold text-lg">{testimonial.name}</h4>
          <p className="text-gold text-sm">{testimonial.country}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
