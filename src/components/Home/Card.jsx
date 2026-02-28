import { Link } from 'react-router';
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa'; 

const Card = ({ service }) => {

  return (
    
            <div
              key={service._id}
              className="
                group bg-base rounded-2xl overflow-hidden 
                shadow-lg hover:shadow-2xl 
                transition-all duration-500 
                transform hover:-translate-y-4
                 
              "
            >
              {/* Image */}
          <div className="relative overflow-hidden h-64 md:h-72">
            <img
              src={service.image}
              alt={service.service_name}
              className="
                    w-full h-full object-cover 
                    transition-transform duration-700 
                    group-hover:scale-110
                  "
            />
            <div className="
                  absolute inset-0 text-base to-transparent 
                  opacity-0 group-hover:opacity-100 
                  transition-opacity duration-500
                " />
            <div className="
                  absolute bottom-0 left-0 right-0 p-6 
                  transform translate-y-10 group-hover:translate-y-0 
                  transition-transform duration-500
                ">
              <h3 className="
                    text-xl md:text-2xl font-playfair font-semibold 
                    text-base drop-shadow-lg
                  ">
                {service.service_name}
              </h3>
            </div>

            {/* Price Badge */}
            <div className="
                  absolute top-5 right-5 
                  bg-primary text-base 
                  px-5 py-2.5 rounded-full 
                  font-semibold text-lg shadow-lg
                  transform group-hover:scale-110 transition-transform duration-300
                ">
              ৳{Number(service.cost).toLocaleString()}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-7">
            <p className="text-base mb-5 line-clamp-3 leading-relaxed">
              {service.description}
            </p>

            <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
              <span className={`
    px-4 py-1.5 rounded-full text-sm font-semibold
    ${service.serviceMode === 'on-site'
      ? 'bg-primary text-white'
      : 'bg-secondary text-white'}
  `}>
                {service.serviceMode === 'on-site' ?  ' On-site' : ' In-studio'}
              </span>
              <span className="font-medium text-primary">
                {service.unit.replace(/-/g, ' ')}
              </span>
            </div>

            {/* CTA */}
            <Link
              to={`/service/${service._id}`}
              className="
                    block w-full 
                    text-center bg-primary text-white 
                    font-semibold text-base md:text-lg 
                    py-3.5 rounded-xl 
                    shadow-md hover:shadow-xl 
                    hover:bg-secondary 
                    transition-all duration-400 
                    transform hover:scale-[1.02]
                  "
            >
              View & Book Service
            </Link>
          </div>
        </div>
  );
};

export default Card;