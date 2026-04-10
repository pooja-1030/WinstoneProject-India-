import { MapPin } from 'lucide-react';

const ProjectCard = ({ project }) => {
  const getCategoryColor = (category) => {
    switch (category) {
      case 'Luxury Villas':
        return 'bg-gold text-luxury-black';
      case 'Waterfront Properties':
        return 'bg-blue-500 text-white';
      case 'High-rise Apartments':
        return 'bg-purple-500 text-white';
      default:
        return 'bg-gold text-luxury-black';
    }
  };

  return (
    <div className="project-card group">
      <div className="project-card-image">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent opacity-60"></div>
        
        {/* Category Badge */}
        <div className={`absolute top-4 left-4 px-4 py-2 text-xs font-semibold uppercase tracking-wider ${getCategoryColor(project.category)}`}>
          {project.category}
        </div>
      </div>

      <div className="project-card-content">
        <h3 className="project-card-title">{project.title}</h3>
        <div className="flex items-center gap-2 project-card-location">
          <MapPin size={16} />
          <span>{project.location}</span>
        </div>
        <p className="text-gray-300 mt-3 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.description}
        </p>
        {project.price && (
          <p className="text-gold font-semibold mt-3 text-lg">
            {project.price}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
