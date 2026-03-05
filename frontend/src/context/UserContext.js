import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { destinations } from '../data';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // 🎨 UI States
  const [currentSlide, setCurrentSlide] = useState(0);
  const [petals, setPetals] = useState([]);
  const [bookingStatus, setBookingStatus] = useState("planning");
  const [statusSteps, setStatusSteps] = useState([
    { label: "Choose Destination", done: false },
    { label: "Select Package", done: false },
    { label: "Book Vendors", done: false },
    { label: "Manage Guests", done: false },
    { label: "Complete Payment", done: false },
    { label: "Send Invitations", done: false }
  ]);

  // 👥 Guest Management
  const [guests, setGuests] = useState([]);
  const [newGuest, setNewGuest] = useState({ name: "", email: "", side: "Bride" });

  // 🎯 Selection States
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedVendors, setSelectedVendors] = useState([]);

  // 💳 Payment & Invitations
  const [paymentDone, setPaymentDone] = useState(false);
  const [inviteDownloaded, setInviteDownloaded] = useState(false);

  // 🔍 Filters
  const [destFilter, setDestFilter] = useState("All");
  const [expandedDest, setExpandedDest] = useState(null);

  // 🎬 Hero Slides Animation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // 🌸 Petals Animation
  useEffect(() => {
    const newPetals = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 4
    }));
    setPetals(newPetals);
  }, []);

  // 🔄 Computed Values
  const filteredDests = useMemo(() => {
    if (destFilter === "All") return destinations;
    return destinations.filter(d => d.region === destFilter);
  }, [destFilter]);

  // 🛠️ Handlers
  const toggleVendor = (id) => {
    setSelectedVendors(prev =>
      prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
    );
  };

  const addGuest = () => {
    if (newGuest.name && newGuest.email) {
      setGuests(prev => [...prev, { ...newGuest, id: Date.now(), rsvp: "pending" }]);
      setNewGuest({ name: "", email: "", side: "Bride" });
    }
  };

  const removeGuest = (id) => {
    setGuests(prev => prev.filter(g => g.id !== id));
  };

  const handlePayment = () => {
    setPaymentDone(true);
    setBookingStatus("confirmed");
    setStatusSteps(prev => prev.map(step => ({ ...step, done: true })));
  };

  const value = {
    // States
    currentSlide,
    setCurrentSlide,
    petals,
    setPetals,
    bookingStatus,
    setBookingStatus,
    statusSteps,
    setStatusSteps,
    guests,
    setGuests,
    newGuest,
    setNewGuest,
    selectedDestination,
    setSelectedDestination,
    selectedPackage,
    setSelectedPackage,
    selectedVendors,
    setSelectedVendors,
    paymentDone,
    setPaymentDone,
    inviteDownloaded,
    setInviteDownloaded,
    destFilter,
    setDestFilter,
    expandedDest,
    setExpandedDest,
    filteredDests,
    // Handlers
    toggleVendor,
    addGuest,
    removeGuest,
    handlePayment
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within UserProvider');
  }
  return context;
};
