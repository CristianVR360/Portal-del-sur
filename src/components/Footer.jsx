import React from 'react';
import { Mail, Instagram, Linkedin, MapPin, Clock } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#1B4332] text-white pt-16 pb-8" id="contacto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Company Info */}
                    <div>
                        <h3 className="font-serif text-3xl font-bold mb-6 text-[#D4A373]">Portal del Sur</h3>
                        <p className="text-gray-300 leading-relaxed mb-6">
                            Llevando el sabor auténtico de la Araucanía a tu mesa por más de 20 años. Calidad, frescura y tradición en cada producto.
                        </p>
                    </div>

                    {/* Contact Details */}
                    <div>
                        <h4 className="font-serif text-xl font-bold mb-6 text-white border-b-2 border-[#D4A373] inline-block pb-1">Ubicación y Contacto</h4>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <MapPin className="text-[#D4A373] shrink-0 mt-1" size={20} />
                                <span className="text-gray-300">Ensenada #0150 - Temuco, Araucanía</span>
                            </div>
                            <div className="flex items-start gap-4">
                                <Clock className="text-[#D4A373] shrink-0 mt-1" size={20} />
                                <div className="text-gray-300">
                                    <p>Lun-Vie: 9:00 - 17:00</p>
                                    <p>Sáb-Dom: 11:00 - 15:00</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Mail className="text-[#D4A373] shrink-0" size={20} />
                                <a href="mailto:info@portaldelsurltda.cl" className="text-gray-300 hover:text-[#D4A373] transition-colors">
                                    info@portaldelsurltda.cl
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Social & Form Link */}
                    <div>
                        <h4 className="font-serif text-xl font-bold mb-6 text-white border-b-2 border-[#D4A373] inline-block pb-1">Conéctate</h4>
                        <div className="flex space-x-4 mb-8">
                            <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-[#D4A373] hover:text-[#1B4332] transition-all duration-300 group">
                                <Instagram size={24} className="group-hover:scale-110 transition-transform" />
                            </a>
                            <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-[#D4A373] hover:text-[#1B4332] transition-all duration-300 group">
                                <Linkedin size={24} className="group-hover:scale-110 transition-transform" />
                            </a>
                        </div>

                        <form action="https://formspree.io/f/xbjnqzzk" method="POST" className="space-y-3 bg-white/5 p-4 rounded-lg border border-white/10">
                            <h5 className="font-medium text-[#D4A373]">Envíanos un mensaje rápido</h5>
                            {/* Simplified form for footer, full form in Contact section */}
                            <input type="email" name="email" placeholder="Tu Email" className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#D4A373] transition-colors" required />
                            <textarea name="message" placeholder="Mensaje" rows="2" className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#D4A373] transition-colors" required></textarea>
                            <button type="submit" className="w-full bg-[#D4A373] text-[#1B4332] font-bold py-2 rounded hover:bg-white transition-colors text-sm">
                                Enviar
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Portal del Sur Ltda. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
