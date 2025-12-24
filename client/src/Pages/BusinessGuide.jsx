import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Map, BookCheck, TrendingUp, User, Heart, Sprout, ScaleIcon, 
  ArrowRight, ChevronDown, ChevronUp, DollarSign, Shield, 
  Workflow, Building, Bird, LineChart, AlertTriangle, Info, 
  Target, BookOpen, Egg, Leaf, Hammer, Milk, Store, Drumstick, 
  Fish, Scissors, Phone, Bike, Factory, Utensils, Coffee, 
  Brush, Truck, Zap, ShoppingBag, Wrench, Palette, Car
} from 'lucide-react';

const BusinessGuide = () => {
  const { businessType } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');

  const RoadmapItem = ({ title, description, status, icon }) => (
    <div className="flex items-start gap-6 relative">
      <div className={`rounded-full p-4 ${'bg-green-500'} w-16 h-16 flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div className="flex-1 bg-green-50/50 rounded-xl p-6 shadow-sm">
        <h3 className={`text-xl font-semibold mb-2 ${'text-green-700'}`}>
          {title}
        </h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );

  const businessData = {
    'poultry-farming': {
      title: 'Poultry Farming',
      icon: <Bird className="w-8 h-8 text-white" />,
      initialInvestment: '₹90,000',
      startingCapacity: '500 chicks',
      location: 'Barabanki',
      category: 'Agriculture',
      investmentBreakdown: [
        ['Buying 500 Day-Old Chicks (DOC)', '₹30,000'],
        ['Poultry Shed Construction/Repair', '₹25,000'],
        ['Feed and Watering Systems (3 months)', '₹15,000'],
        ['Vaccination & Veterinary Care', '₹5,000'],
        ['Equipment (Nest boxes, feeders, etc.)', '₹10,000'],
        ['Miscellaneous (Transport, Licenses)', '₹5,000']
      ],
      roadmap: [
        { title: 'Initial Setup', description: 'Secure funding, acquire land, and establish basic infrastructure', icon: <Building className="w-8 h-8 text-white" /> },
        { title: 'Farm Development', description: 'Build poultry sheds, install equipment, and implement biosecurity measures', icon: <Hammer className="w-8 h-8 text-white" /> },
        { title: 'Operations & Management', description: 'Start with initial flock and establish daily management routines', icon: <Bird className="w-8 h-8 text-white" /> },
        { title: 'Scaling & Growth', description: 'Expand flock size, optimize operations, and increase market presence', icon: <Sprout className="w-8 h-8 text-white" /> }
      ]
    },
    'dairy-farming': {
      title: 'Dairy Farming',
      icon: <Milk className="w-8 h-8 text-white" />,
      initialInvestment: '₹1,50,000',
      startingCapacity: '5-10 cows',
      location: 'Barabanki',
      category: 'Agriculture',
      investmentBreakdown: [
        ['Purchase of 5-10 cows', '₹1,00,000'],
        ['Shed construction and equipment', '₹30,000'],
        ['Feed and fodder (3 months)', '₹15,000'],
        ['Veterinary care and medicines', '₹5,000']
      ],
      roadmap: [
        { title: 'Land & Infrastructure', description: 'Secure land, build sheds, and install milking equipment', icon: <Building className="w-8 h-8 text-white" /> },
        { title: 'Livestock Acquisition', description: 'Purchase healthy cows and establish feeding systems', icon: <Milk className="w-8 h-8 text-white" /> },
        { title: 'Daily Operations', description: 'Implement milking schedules and health monitoring', icon: <Workflow className="w-8 h-8 text-white" /> },
        { title: 'Market Expansion', description: 'Develop distribution channels and value-added products', icon: <TrendingUp className="w-8 h-8 text-white" /> }
      ]
    },
    'grocery-shop': {
      title: 'Grocery Shop',
      icon: <Store className="w-8 h-8 text-white" />,
      initialInvestment: '₹50,000',
      startingCapacity: 'Basic inventory',
      location: 'Local market area',
      category: 'Retail',
      investmentBreakdown: [
        ['Shop rent and deposit', '₹20,000'],
        ['Initial inventory', '₹25,000'],
        ['Shelving and display units', '₹3,000'],
        ['Licenses and permits', '₹2,000']
      ],
      roadmap: [
        { title: 'Location Selection', description: 'Find prime location with good foot traffic', icon: <Map className="w-8 h-8 text-white" /> },
        { title: 'Setup & Inventory', description: 'Stock essential items and organize display', icon: <ShoppingBag className="w-8 h-8 text-white" /> },
        { title: 'Operations', description: 'Establish daily routines and customer service', icon: <Workflow className="w-8 h-8 text-white" /> },
        { title: 'Growth', description: 'Expand product range and customer base', icon: <TrendingUp className="w-8 h-8 text-white" /> }
      ]
    },
    'goat-farming': {
      title: 'Goat Farming',
      icon: <Drumstick className="w-8 h-8 text-white" />,
      initialInvestment: '₹80,000',
      startingCapacity: '20-25 goats',
      location: 'Barabanki',
      category: 'Agriculture',
      investmentBreakdown: [
        ['Purchase of 20-25 goats', '₹60,000'],
        ['Shed construction', '₹15,000'],
        ['Feed and fodder', '₹3,000'],
        ['Veterinary care', '₹2,000']
      ],
      roadmap: [
        { title: 'Infrastructure Setup', description: 'Build goat sheds and fencing', icon: <Building className="w-8 h-8 text-white" /> },
        { title: 'Livestock Management', description: 'Acquire goats and establish feeding systems', icon: <Drumstick className="w-8 h-8 text-white" /> },
        { title: 'Breeding Program', description: 'Implement breeding and health monitoring', icon: <Heart className="w-8 h-8 text-white" /> },
        { title: 'Market Development', description: 'Establish meat and milk markets', icon: <TrendingUp className="w-8 h-8 text-white" /> }
      ]
    },
    'vegetable-farming': {
      title: 'Vegetable Farming',
      icon: <Leaf className="w-8 h-8 text-white" />,
      initialInvestment: '₹40,000',
      startingCapacity: '1-2 acres',
      location: 'Barabanki',
      category: 'Agriculture',
      investmentBreakdown: [
        ['Land preparation and seeds', '₹15,000'],
        ['Irrigation system', '₹10,000'],
        ['Fertilizers and pesticides', '₹8,000'],
        ['Tools and equipment', '₹7,000']
      ],
      roadmap: [
        { title: 'Land Preparation', description: 'Soil testing and land preparation', icon: <Hammer className="w-8 h-8 text-white" /> },
        { title: 'Crop Planning', description: 'Select crops and planting schedule', icon: <Leaf className="w-8 h-8 text-white" /> },
        { title: 'Cultivation', description: 'Planting, irrigation, and pest management', icon: <Sprout className="w-8 h-8 text-white" /> },
        { title: 'Harvest & Sales', description: 'Harvesting and market distribution', icon: <ShoppingBag className="w-8 h-8 text-white" /> }
      ]
    },
    'fish-farming': {
      title: 'Fish Farming',
      icon: <Fish className="w-8 h-8 text-white" />,
      initialInvestment: '₹1,00,000',
      startingCapacity: '1 pond',
      location: 'Barabanki',
      category: 'Agriculture',
      investmentBreakdown: [
        ['Pond construction', '₹60,000'],
        ['Fish seeds and feed', '₹25,000'],
        ['Water management system', '₹10,000'],
        ['Equipment and tools', '₹5,000']
      ],
      roadmap: [
        { title: 'Pond Construction', description: 'Build and prepare fish ponds', icon: <Building className="w-8 h-8 text-white" /> },
        { title: 'Stocking', description: 'Introduce fish seeds and establish feeding', icon: <Fish className="w-8 h-8 text-white" /> },
        { title: 'Management', description: 'Water quality and health monitoring', icon: <Workflow className="w-8 h-8 text-white" /> },
        { title: 'Harvesting', description: 'Fish harvesting and market sales', icon: <TrendingUp className="w-8 h-8 text-white" /> }
      ]
    },
    'tailoring-shop': {
      title: 'Tailoring Shop',
      icon: <Scissors className="w-8 h-8 text-white" />,
      initialInvestment: '₹30,000',
      startingCapacity: 'Basic setup',
      location: 'Local market',
      category: 'Services',
      investmentBreakdown: [
        ['Sewing machines', '₹15,000'],
        ['Shop setup and furniture', '₹8,000'],
        ['Initial fabric stock', '₹5,000'],
        ['Tools and accessories', '₹2,000']
      ],
      roadmap: [
        { title: 'Skill Development', description: 'Learn tailoring skills and techniques', icon: <BookCheck className="w-8 h-8 text-white" /> },
        { title: 'Shop Setup', description: 'Establish shop and acquire equipment', icon: <Building className="w-8 h-8 text-white" /> },
        { title: 'Operations', description: 'Start taking orders and building clientele', icon: <Scissors className="w-8 h-8 text-white" /> },
        { title: 'Expansion', description: 'Expand services and hire staff', icon: <TrendingUp className="w-8 h-8 text-white" /> }
      ]
    },
    'beauty-parlour': {
      title: 'Beauty Parlour',
      icon: <Scissors className="w-8 h-8 text-white" />,
      initialInvestment: '₹40,000',
      startingCapacity: 'Basic services',
      location: 'Local market',
      category: 'Services',
      investmentBreakdown: [
        ['Equipment and tools', '₹20,000'],
        ['Shop setup and furniture', '₹10,000'],
        ['Initial products', '₹8,000'],
        ['Licenses and training', '₹2,000']
      ],
      roadmap: [
        { title: 'Training & Certification', description: 'Get professional training and certification', icon: <BookCheck className="w-8 h-8 text-white" /> },
        { title: 'Shop Setup', description: 'Establish parlour with equipment', icon: <Building className="w-8 h-8 text-white" /> },
        { title: 'Service Launch', description: 'Start offering beauty services', icon: <Scissors className="w-8 h-8 text-white" /> },
        { title: 'Growth', description: 'Expand services and client base', icon: <TrendingUp className="w-8 h-8 text-white" /> }
      ]
    },
    'mobile-repair': {
      title: 'Mobile Repair Shop',
      icon: <Phone className="w-8 h-8 text-white" />,
      initialInvestment: '₹35,000',
      startingCapacity: 'Basic repairs',
      location: 'Local market',
      category: 'Services',
      investmentBreakdown: [
        ['Repair tools and equipment', '₹15,000'],
        ['Shop setup', '₹8,000'],
        ['Initial spare parts', '₹10,000'],
        ['Training and certification', '₹2,000']
      ],
      roadmap: [
        { title: 'Skill Development', description: 'Learn mobile repair techniques', icon: <BookCheck className="w-8 h-8 text-white" /> },
        { title: 'Shop Setup', description: 'Establish repair shop with tools', icon: <Building className="w-8 h-8 text-white" /> },
        { title: 'Operations', description: 'Start repair services', icon: <Wrench className="w-8 h-8 text-white" /> },
        { title: 'Expansion', description: 'Add more services and hire staff', icon: <TrendingUp className="w-8 h-8 text-white" /> }
      ]
    },
    'cycle-repair': {
      title: 'Cycle Repair Shop',
      icon: <Bike className="w-8 h-8 text-white" />,
      initialInvestment: '₹25,000',
      startingCapacity: 'Basic repairs',
      location: 'Local market',
      category: 'Services',
      investmentBreakdown: [
        ['Repair tools and equipment', '₹12,000'],
        ['Shop setup', '₹6,000'],
        ['Initial spare parts', '₹5,000'],
        ['Licenses', '₹2,000']
      ],
      roadmap: [
        { title: 'Skill Development', description: 'Learn cycle repair techniques', icon: <BookCheck className="w-8 h-8 text-white" /> },
        { title: 'Shop Setup', description: 'Establish repair shop', icon: <Building className="w-8 h-8 text-white" /> },
        { title: 'Operations', description: 'Start repair services', icon: <Wrench className="w-8 h-8 text-white" /> },
        { title: 'Growth', description: 'Expand services and client base', icon: <TrendingUp className="w-8 h-8 text-white" /> }
      ]
    },
    'bee-keeping': {
      title: 'Bee-Keeping',
      icon: <Leaf className="w-8 h-8 text-white" />,
      initialInvestment: '₹45,000',
      startingCapacity: '10-15 hives',
      location: 'Barabanki',
      category: 'Agriculture',
      investmentBreakdown: [
        ['Bee hives and equipment', '₹25,000'],
        ['Protective gear', '₹5,000'],
        ['Initial bee colonies', '₹10,000'],
        ['Training and certification', '₹5,000']
      ],
      roadmap: [
        { title: 'Training & Setup', description: 'Learn beekeeping and set up hives', icon: <BookCheck className="w-8 h-8 text-white" /> },
        { title: 'Colony Management', description: 'Establish and manage bee colonies', icon: <Leaf className="w-8 h-8 text-white" /> },
        { title: 'Honey Production', description: 'Harvest honey and other products', icon: <Sprout className="w-8 h-8 text-white" /> },
        { title: 'Market Development', description: 'Sell honey and bee products', icon: <TrendingUp className="w-8 h-8 text-white" /> }
      ]
    },
    'organic-fertilizer-production': {
      title: 'Organic Fertilizer Production',
      icon: <Factory className="w-8 h-8 text-white" />,
      initialInvestment: '₹60,000',
      startingCapacity: 'Small scale',
      location: 'Barabanki',
      category: 'Manufacturing',
      investmentBreakdown: [
        ['Equipment and machinery', '₹30,000'],
        ['Raw materials', '₹20,000'],
        ['Processing unit setup', '₹8,000'],
        ['Licenses and permits', '₹2,000']
      ],
      roadmap: [
        { title: 'Setup & Equipment', description: 'Establish processing unit', icon: <Building className="w-8 h-8 text-white" /> },
        { title: 'Production Process', description: 'Start fertilizer production', icon: <Factory className="w-8 h-8 text-white" /> },
        { title: 'Quality Control', description: 'Ensure product quality', icon: <ScaleIcon className="w-8 h-8 text-white" /> },
        { title: 'Market Distribution', description: 'Sell to farmers and retailers', icon: <TrendingUp className="w-8 h-8 text-white" /> }
      ]
    },
    'papad-and-pickle-making': {
      title: 'Papad and Pickle Making',
      icon: <Utensils className="w-8 h-8 text-white" />,
      initialInvestment: '₹35,000',
      startingCapacity: 'Home-based',
      location: 'Home/Workshop',
      category: 'Manufacturing',
      investmentBreakdown: [
        ['Equipment and utensils', '₹15,000'],
        ['Initial raw materials', '₹12,000'],
        ['Packaging materials', '₹5,000'],
        ['Licenses and permits', '₹3,000']
      ],
      roadmap: [
        { title: 'Recipe Development', description: 'Perfect recipes and techniques', icon: <BookCheck className="w-8 h-8 text-white" /> },
        { title: 'Production Setup', description: 'Establish production unit', icon: <Building className="w-8 h-8 text-white" /> },
        { title: 'Production', description: 'Start manufacturing products', icon: <Utensils className="w-8 h-8 text-white" /> },
        { title: 'Market Sales', description: 'Sell to local markets and shops', icon: <TrendingUp className="w-8 h-8 text-white" /> }
      ]
    },
    'tea-shop': {
      title: 'Tea Shop',
      icon: <Coffee className="w-8 h-8 text-white" />,
      initialInvestment: '₹30,000',
      startingCapacity: 'Basic setup',
      location: 'High foot traffic area',
      category: 'Retail',
      investmentBreakdown: [
        ['Shop setup and furniture', '₹15,000'],
        ['Equipment and utensils', '₹8,000'],
        ['Initial inventory', '₹5,000'],
        ['Licenses and permits', '₹2,000']
      ],
      roadmap: [
        { title: 'Location Selection', description: 'Find high-traffic location', icon: <Map className="w-8 h-8 text-white" /> },
        { title: 'Shop Setup', description: 'Establish tea shop', icon: <Building className="w-8 h-8 text-white" /> },
        { title: 'Operations', description: 'Start serving customers', icon: <Coffee className="w-8 h-8 text-white" /> },
        { title: 'Growth', description: 'Expand menu and clientele', icon: <TrendingUp className="w-8 h-8 text-white" /> }
      ]
    },
    'handicrafts': {
      title: 'Handicrafts',
      icon: <Brush className="w-8 h-8 text-white" />,
      initialInvestment: '₹25,000',
      startingCapacity: 'Home-based',
      location: 'Home/Workshop',
      category: 'Manufacturing',
      investmentBreakdown: [
        ['Tools and equipment', '₹10,000'],
        ['Raw materials', '₹8,000'],
        ['Workshop setup', '₹5,000'],
        ['Training and skills', '₹2,000']
      ],
      roadmap: [
        { title: 'Skill Development', description: 'Learn handicraft techniques', icon: <BookCheck className="w-8 h-8 text-white" /> },
        { title: 'Workshop Setup', description: 'Establish production space', icon: <Building className="w-8 h-8 text-white" /> },
        { title: 'Production', description: 'Start crafting products', icon: <Brush className="w-8 h-8 text-white" /> },
        { title: 'Market Sales', description: 'Sell through various channels', icon: <TrendingUp className="w-8 h-8 text-white" /> }
      ]
    },
    'solar-panel-installation': {
      title: 'Solar Panel Installation',
      icon: <Zap className="w-8 h-8 text-white" />,
      initialInvestment: '₹80,000',
      startingCapacity: 'Small installations',
      location: 'Service area',
      category: 'Services',
      investmentBreakdown: [
        ['Tools and equipment', '₹30,000'],
        ['Vehicle for service', '₹35,000'],
        ['Training and certification', '₹10,000'],
        ['Marketing and licenses', '₹5,000']
      ],
      roadmap: [
        { title: 'Training & Certification', description: 'Get solar installation training', icon: <BookCheck className="w-8 h-8 text-white" /> },
        { title: 'Equipment Setup', description: 'Acquire tools and vehicle', icon: <Building className="w-8 h-8 text-white" /> },
        { title: 'Service Launch', description: 'Start installation services', icon: <Zap className="w-8 h-8 text-white" /> },
        { title: 'Growth', description: 'Expand service area and team', icon: <TrendingUp className="w-8 h-8 text-white" /> }
      ]
    },
    'seed-and-fertilizer-store': {
      title: 'Seed and Fertilizer Store',
      icon: <Store className="w-8 h-8 text-white" />,
      initialInvestment: '₹60,000',
      startingCapacity: 'Basic inventory',
      location: 'Agricultural area',
      category: 'Retail',
      investmentBreakdown: [
        ['Shop setup and storage', '₹25,000'],
        ['Initial inventory', '₹30,000'],
        ['Equipment and tools', '₹3,000'],
        ['Licenses and permits', '₹2,000']
      ],
      roadmap: [
        { title: 'Location & Setup', description: 'Find agricultural area and set up shop', icon: <Map className="w-8 h-8 text-white" /> },
        { title: 'Inventory Management', description: 'Stock quality seeds and fertilizers', icon: <ShoppingBag className="w-8 h-8 text-white" /> },
        { title: 'Operations', description: 'Serve farmers and provide advice', icon: <Store className="w-8 h-8 text-white" /> },
        { title: 'Growth', description: 'Expand product range and services', icon: <TrendingUp className="w-8 h-8 text-white" /> }
      ]
    },
    'animal-feed-business': {
      title: 'Animal Feed Business',
      icon: <Factory className="w-8 h-8 text-white" />,
      initialInvestment: '₹70,000',
      startingCapacity: 'Small scale',
      location: 'Agricultural area',
      category: 'Manufacturing',
      investmentBreakdown: [
        ['Processing equipment', '₹35,000'],
        ['Raw materials', '₹25,000'],
        ['Production unit setup', '₹8,000'],
        ['Licenses and permits', '₹2,000']
      ],
      roadmap: [
        { title: 'Setup & Equipment', description: 'Establish feed processing unit', icon: <Building className="w-8 h-8 text-white" /> },
        { title: 'Production Process', description: 'Start feed manufacturing', icon: <Factory className="w-8 h-8 text-white" /> },
        { title: 'Quality Control', description: 'Ensure nutritional standards', icon: <ScaleIcon className="w-8 h-8 text-white" /> },
        { title: 'Market Distribution', description: 'Sell to farmers and dealers', icon: <TrendingUp className="w-8 h-8 text-white" /> }
      ]
    },
    'transport-service': {
      title: 'Transport Service',
      icon: <Truck className="w-8 h-8 text-white" />,
      initialInvestment: '₹1,20,000',
      startingCapacity: '1 vehicle',
      location: 'Service area',
      category: 'Services',
      investmentBreakdown: [
        ['Vehicle purchase', '₹1,00,000'],
        ['Vehicle registration and permits', '₹15,000'],
        ['Insurance and maintenance', '₹3,000'],
        ['Marketing and licenses', '₹2,000']
      ],
      roadmap: [
        { title: 'Vehicle Acquisition', description: 'Purchase and register vehicle', icon: <Car className="w-8 h-8 text-white" /> },
        { title: 'Service Setup', description: 'Establish transport services', icon: <Building className="w-8 h-8 text-white" /> },
        { title: 'Operations', description: 'Start transport services', icon: <Truck className="w-8 h-8 text-white" /> },
        { title: 'Growth', description: 'Expand fleet and service area', icon: <TrendingUp className="w-8 h-8 text-white" /> }
      ]
    },
    'mushroom-farming': {
      title: 'Mushroom Farming',
      icon: <Leaf className="w-8 h-8 text-white" />,
      initialInvestment: '₹35,000',
      startingCapacity: '100 sq ft',
      location: 'Home/Greenhouse',
      category: 'Agriculture',
      investmentBreakdown: [
        ['Growing room setup', '₹15,000'],
        ['Mushroom spawn and substrate', '₹8,000'],
        ['Climate control equipment', '₹7,000'],
        ['Packaging and marketing', '₹5,000']
      ],
      roadmap: [
        { title: 'Setup & Infrastructure', description: 'Create growing environment and equipment', icon: <Building className="w-8 h-8 text-white" /> },
        { title: 'Production Process', description: 'Start mushroom cultivation cycles', icon: <Leaf className="w-8 h-8 text-white" /> },
        { title: 'Harvesting & Sales', description: 'Harvest and market mushrooms', icon: <ShoppingBag className="w-8 h-8 text-white" /> },
        { title: 'Expansion', description: 'Scale up production and varieties', icon: <TrendingUp className="w-8 h-8 text-white" /> }
      ]
    },
    'herbal-medicine': {
      title: 'Herbal Medicine Production',
      icon: <Leaf className="w-8 h-8 text-white" />,
      initialInvestment: '₹45,000',
      startingCapacity: 'Small scale',
      location: 'Home/Workshop',
      category: 'Manufacturing',
      investmentBreakdown: [
        ['Equipment and tools', '₹20,000'],
        ['Raw materials and herbs', '₹15,000'],
        ['Packaging and labeling', '₹7,000'],
        ['Licenses and certification', '₹3,000']
      ],
      roadmap: [
        { title: 'Research & Development', description: 'Study traditional medicine and formulations', icon: <BookCheck className="w-8 h-8 text-white" /> },
        { title: 'Production Setup', description: 'Establish manufacturing unit', icon: <Building className="w-8 h-8 text-white" /> },
        { title: 'Quality Control', description: 'Ensure product safety and efficacy', icon: <ScaleIcon className="w-8 h-8 text-white" /> },
        { title: 'Market Launch', description: 'Sell through various channels', icon: <TrendingUp className="w-8 h-8 text-white" /> }
      ]
    },
    'bamboo-craft': {
      title: 'Bamboo Craft Business',
      icon: <Brush className="w-8 h-8 text-white" />,
      initialInvestment: '₹30,000',
      startingCapacity: 'Home-based',
      location: 'Home/Workshop',
      category: 'Manufacturing',
      investmentBreakdown: [
        ['Tools and equipment', '₹12,000'],
        ['Bamboo raw materials', '₹10,000'],
        ['Workshop setup', '₹5,000'],
        ['Training and skills', '₹3,000']
      ],
      roadmap: [
        { title: 'Skill Development', description: 'Learn bamboo crafting techniques', icon: <BookCheck className="w-8 h-8 text-white" /> },
        { title: 'Workshop Setup', description: 'Establish production space', icon: <Building className="w-8 h-8 text-white" /> },
        { title: 'Production', description: 'Start crafting bamboo products', icon: <Brush className="w-8 h-8 text-white" /> },
        { title: 'Market Sales', description: 'Sell through various channels', icon: <TrendingUp className="w-8 h-8 text-white" /> }
      ]
    },
    'poultry-feed-production': {
      title: 'Poultry Feed Production',
      icon: <Factory className="w-8 h-8 text-white" />,
      initialInvestment: '₹75,000',
      startingCapacity: 'Small scale',
      location: 'Agricultural area',
      category: 'Manufacturing',
      investmentBreakdown: [
        ['Processing equipment', '₹40,000'],
        ['Raw materials', '₹25,000'],
        ['Production unit setup', '₹8,000'],
        ['Licenses and permits', '₹2,000']
      ],
      roadmap: [
        { title: 'Setup & Equipment', description: 'Establish feed processing unit', icon: <Building className="w-8 h-8 text-white" /> },
        { title: 'Production Process', description: 'Start feed manufacturing', icon: <Factory className="w-8 h-8 text-white" /> },
        { title: 'Quality Control', description: 'Ensure nutritional standards', icon: <ScaleIcon className="w-8 h-8 text-white" /> },
        { title: 'Market Distribution', description: 'Sell to poultry farmers', icon: <TrendingUp className="w-8 h-8 text-white" /> }
      ]
    },
    'dairy-products': {
      title: 'Dairy Products Manufacturing',
      icon: <Milk className="w-8 h-8 text-white" />,
      initialInvestment: '₹85,000',
      startingCapacity: 'Small scale',
      location: 'Dairy farm area',
      category: 'Manufacturing',
      investmentBreakdown: [
        ['Processing equipment', '₹45,000'],
        ['Raw milk supply', '₹25,000'],
        ['Packaging materials', '₹10,000'],
        ['Licenses and permits', '₹5,000']
      ],
      roadmap: [
        { title: 'Equipment Setup', description: 'Install dairy processing equipment', icon: <Building className="w-8 h-8 text-white" /> },
        { title: 'Production Process', description: 'Start dairy product manufacturing', icon: <Milk className="w-8 h-8 text-white" /> },
        { title: 'Quality Control', description: 'Ensure food safety standards', icon: <ScaleIcon className="w-8 h-8 text-white" /> },
        { title: 'Market Distribution', description: 'Sell dairy products', icon: <TrendingUp className="w-8 h-8 text-white" /> }
      ]
    },
    'agri-consultancy': {
      title: 'Agricultural Consultancy',
      icon: <BookCheck className="w-8 h-8 text-white" />,
      initialInvestment: '₹25,000',
      startingCapacity: 'Home-based',
      location: 'Service area',
      category: 'Services',
      investmentBreakdown: [
        ['Office setup and equipment', '₹10,000'],
        ['Training and certification', '₹8,000'],
        ['Marketing and networking', '₹5,000'],
        ['Licenses and permits', '₹2,000']
      ],
      roadmap: [
        { title: 'Skill Development', description: 'Get agricultural expertise and certification', icon: <BookCheck className="w-8 h-8 text-white" /> },
        { title: 'Business Setup', description: 'Establish consultancy practice', icon: <Building className="w-8 h-8 text-white" /> },
        { title: 'Service Launch', description: 'Start offering consultancy services', icon: <Workflow className="w-8 h-8 text-white" /> },
        { title: 'Growth', description: 'Expand client base and services', icon: <TrendingUp className="w-8 h-8 text-white" /> }
      ]
    },
    'soil-testing-lab': {
      title: 'Soil Testing Laboratory',
      icon: <ScaleIcon className="w-8 h-8 text-white" />,
      initialInvestment: '₹60,000',
      startingCapacity: 'Basic testing',
      location: 'Agricultural area',
      category: 'Services',
      investmentBreakdown: [
        ['Laboratory equipment', '₹35,000'],
        ['Lab setup and chemicals', '₹15,000'],
        ['Training and certification', '₹7,000'],
        ['Licenses and permits', '₹3,000']
      ],
      roadmap: [
        { title: 'Training & Certification', description: 'Get soil testing certification', icon: <BookCheck className="w-8 h-8 text-white" /> },
        { title: 'Lab Setup', description: 'Establish testing laboratory', icon: <Building className="w-8 h-8 text-white" /> },
        { title: 'Service Launch', description: 'Start soil testing services', icon: <ScaleIcon className="w-8 h-8 text-white" /> },
        { title: 'Growth', description: 'Expand testing services', icon: <TrendingUp className="w-8 h-8 text-white" /> }
      ]
    },
    'organic-certification': {
      title: 'Organic Certification Agency',
      icon: <Shield className="w-8 h-8 text-white" />,
      initialInvestment: '₹40,000',
      startingCapacity: 'Local area',
      location: 'Service area',
      category: 'Services',
      investmentBreakdown: [
        ['Office setup and equipment', '₹15,000'],
        ['Training and certification', '₹12,000'],
        ['Marketing and networking', '₹8,000'],
        ['Licenses and permits', '₹5,000']
      ],
      roadmap: [
        { title: 'Training & Certification', description: 'Get organic certification training', icon: <BookCheck className="w-8 h-8 text-white" /> },
        { title: 'Business Setup', description: 'Establish certification agency', icon: <Building className="w-8 h-8 text-white" /> },
        { title: 'Service Launch', description: 'Start certification services', icon: <Shield className="w-8 h-8 text-white" /> },
        { title: 'Growth', description: 'Expand certification area', icon: <TrendingUp className="w-8 h-8 text-white" /> }
      ]
    },
    'farm-equipment-rental': {
      title: 'Farm Equipment Rental',
      icon: <Wrench className="w-8 h-8 text-white" />,
      initialInvestment: '₹1,50,000',
      startingCapacity: 'Basic equipment',
      location: 'Agricultural area',
      category: 'Services',
      investmentBreakdown: [
        ['Equipment purchase', '₹1,20,000'],
        ['Storage and maintenance', '₹20,000'],
        ['Insurance and permits', '₹7,000'],
        ['Marketing and licenses', '₹3,000']
      ],
      roadmap: [
        { title: 'Equipment Acquisition', description: 'Purchase farm equipment', icon: <Wrench className="w-8 h-8 text-white" /> },
        { title: 'Business Setup', description: 'Establish rental service', icon: <Building className="w-8 h-8 text-white" /> },
        { title: 'Service Launch', description: 'Start equipment rental', icon: <Workflow className="w-8 h-8 text-white" /> },
        { title: 'Growth', description: 'Expand equipment fleet', icon: <TrendingUp className="w-8 h-8 text-white" /> }
      ]
    },
    'agricultural-tourism': {
      title: 'Agricultural Tourism',
      icon: <Map className="w-8 h-8 text-white" />,
      initialInvestment: '₹80,000',
      startingCapacity: 'Small farm',
      location: 'Rural area',
      category: 'Services',
      investmentBreakdown: [
        ['Farm infrastructure', '₹40,000'],
        ['Tourism facilities', '₹25,000'],
        ['Marketing and promotion', '₹10,000'],
        ['Licenses and permits', '₹5,000']
      ],
      roadmap: [
        { title: 'Infrastructure Development', description: 'Develop farm for tourism', icon: <Building className="w-8 h-8 text-white" /> },
        { title: 'Tourism Setup', description: 'Create tourism facilities', icon: <Map className="w-8 h-8 text-white" /> },
        { title: 'Service Launch', description: 'Start tourism services', icon: <Workflow className="w-8 h-8 text-white" /> },
        { title: 'Growth', description: 'Expand tourism activities', icon: <TrendingUp className="w-8 h-8 text-white" /> }
      ]
    },
    'bio-gas-plant': {
      title: 'Bio-gas Plant Installation',
      icon: <Zap className="w-8 h-8 text-white" />,
      initialInvestment: '₹70,000',
      startingCapacity: 'Small plant',
      location: 'Rural area',
      category: 'Services',
      investmentBreakdown: [
        ['Plant equipment', '₹45,000'],
        ['Installation and setup', '₹15,000'],
        ['Training and certification', '₹7,000'],
        ['Marketing and licenses', '₹3,000']
      ],
      roadmap: [
        { title: 'Training & Certification', description: 'Get bio-gas installation training', icon: <BookCheck className="w-8 h-8 text-white" /> },
        { title: 'Equipment Setup', description: 'Acquire installation equipment', icon: <Building className="w-8 h-8 text-white" /> },
        { title: 'Service Launch', description: 'Start installation services', icon: <Zap className="w-8 h-8 text-white" /> },
        { title: 'Growth', description: 'Expand service area', icon: <TrendingUp className="w-8 h-8 text-white" /> }
      ]
    },
    'seed-production': {
      title: 'Seed Production Business',
      icon: <Sprout className="w-8 h-8 text-white" />,
      initialInvestment: '₹55,000',
      startingCapacity: 'Small scale',
      location: 'Agricultural area',
      category: 'Agriculture',
      investmentBreakdown: [
        ['Land preparation', '₹20,000'],
        ['Seed stock and equipment', '₹25,000'],
        ['Processing and packaging', '₹7,000'],
        ['Licenses and permits', '₹3,000']
      ],
      roadmap: [
        { title: 'Land Preparation', description: 'Prepare land for seed production', icon: <Building className="w-8 h-8 text-white" /> },
        { title: 'Seed Production', description: 'Start seed cultivation', icon: <Sprout className="w-8 h-8 text-white" /> },
        { title: 'Processing & Packaging', description: 'Process and package seeds', icon: <ScaleIcon className="w-8 h-8 text-white" /> },
        { title: 'Market Sales', description: 'Sell quality seeds', icon: <TrendingUp className="w-8 h-8 text-white" /> }
      ]
    },
    'vermicompost-production': {
      title: 'Vermicompost Production',
      icon: <Leaf className="w-8 h-8 text-white" />,
      initialInvestment: '₹35,000',
      startingCapacity: 'Small scale',
      location: 'Home/Farm',
      category: 'Manufacturing',
      investmentBreakdown: [
        ['Worm beds and equipment', '₹15,000'],
        ['Initial worm stock', '₹8,000'],
        ['Raw materials', '₹7,000'],
        ['Packaging and marketing', '₹5,000']
      ],
      roadmap: [
        { title: 'Setup & Infrastructure', description: 'Create worm beds and environment', icon: <Building className="w-8 h-8 text-white" /> },
        { title: 'Production Process', description: 'Start vermicompost production', icon: <Leaf className="w-8 h-8 text-white" /> },
        { title: 'Quality Control', description: 'Ensure compost quality', icon: <ScaleIcon className="w-8 h-8 text-white" /> },
        { title: 'Market Sales', description: 'Sell organic compost', icon: <TrendingUp className="w-8 h-8 text-white" /> }
      ]
    },
    'poultry-vaccination': {
      title: 'Poultry Vaccination Service',
      icon: <Shield className="w-8 h-8 text-white" />,
      initialInvestment: '₹45,000',
      startingCapacity: 'Local area',
      location: 'Poultry farming area',
      category: 'Services',
      investmentBreakdown: [
        ['Vaccination equipment', '₹20,000'],
        ['Vaccines and medicines', '₹15,000'],
        ['Training and certification', '₹7,000'],
        ['Marketing and licenses', '₹3,000']
      ],
      roadmap: [
        { title: 'Training & Certification', description: 'Get veterinary training', icon: <BookCheck className="w-8 h-8 text-white" /> },
        { title: 'Equipment Setup', description: 'Acquire vaccination equipment', icon: <Building className="w-8 h-8 text-white" /> },
        { title: 'Service Launch', description: 'Start vaccination services', icon: <Shield className="w-8 h-8 text-white" /> },
        { title: 'Growth', description: 'Expand service area', icon: <TrendingUp className="w-8 h-8 text-white" /> }
      ]
    },
    'agricultural-insurance': {
      title: 'Agricultural Insurance Agency',
      icon: <Shield className="w-8 h-8 text-white" />,
      initialInvestment: '₹30,000',
      startingCapacity: 'Local area',
      location: 'Agricultural area',
      category: 'Services',
      investmentBreakdown: [
        ['Office setup and equipment', '₹12,000'],
        ['Training and certification', '₹10,000'],
        ['Marketing and networking', '₹5,000'],
        ['Licenses and permits', '₹3,000']
      ],
      roadmap: [
        { title: 'Training & Certification', description: 'Get insurance agent training', icon: <BookCheck className="w-8 h-8 text-white" /> },
        { title: 'Business Setup', description: 'Establish insurance agency', icon: <Building className="w-8 h-8 text-white" /> },
        { title: 'Service Launch', description: 'Start insurance services', icon: <Shield className="w-8 h-8 text-white" /> },
        { title: 'Growth', description: 'Expand client base', icon: <TrendingUp className="w-8 h-8 text-white" /> }
      ]
    }
  };

  const currentBusiness = businessData[businessType];

  useEffect(() => {
    if (!currentBusiness) {
      navigate('/rural');
    }
  }, [businessType, currentBusiness, navigate]);

  if (!currentBusiness) {
    return <div>Business not found</div>;
  }

  const sections = [
    {
      id: 'overview',
      title: 'Overview',
      icon: <Info className="w-6 h-6" />,
      content: (
        <div className="space-y-8 animate-fadeIn">
          <div className="space-y-8 mt-4 ml-16">
            <h3 className="text-2xl font-bold text-green-800 mb-6">Your {currentBusiness.title} Journey</h3>
            
            <div className="space-y-12 relative">
              <div className="absolute left-7 top-16 bottom-16 w-0.5 bg-green-200" />
              
              {currentBusiness.roadmap.map((item, index) => (
                <RoadmapItem
                  key={index}
                  title={item.title}
                  description={item.description}
                  status="completed"
                  icon={item.icon}
                />
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'planning',
      title: 'Planning',
      icon: <Target className="w-6 h-6" />,
      content: (
        <div className="space-y-6 animate-fadeIn">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Feasibility & Planning</h2>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
            <h3 className="text-xl font-semibold text-green-700 mb-4">Quick Facts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800 mb-3">Investment Details</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span>Initial Investment: {currentBusiness.initialInvestment}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-green-600" />
                    <span>Starting Capacity: {currentBusiness.startingCapacity}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Map className="w-5 h-5 text-green-600" />
                    <span>Location: {currentBusiness.location}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Building className="w-5 h-5 text-green-600" />
                    <span>Category: {currentBusiness.category}</span>
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800 mb-3">Investment Breakdown</h4>
                <ul className="space-y-3">
                  {currentBusiness.investmentBreakdown.map(([item, cost], i) => (
                    <li key={i} className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-green-600" />
                      <span>{item}: {cost}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure',
      icon: <Building className="w-6 h-6" />,
      content: (
        <div className="space-y-6 animate-fadeIn">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Infrastructure Requirements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
              <h3 className="text-xl font-semibold text-green-700 mb-4">Physical Infrastructure</h3>
              <ul className="space-y-3">
                {[
                  'Sheds and housing facilities',
                  'Storage and processing areas',
                  'Water supply and drainage systems',
                  'Power backup and lighting',
                  'Security and fencing',
                  'Access roads and parking'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Building className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
              <h3 className="text-xl font-semibold text-green-700 mb-4">Equipment & Machinery</h3>
              <ul className="space-y-3">
                {[
                  'Essential machinery and tools',
                  'Processing and packaging equipment',
                  'Quality testing instruments',
                  'Safety equipment and PPE',
                  'Communication systems',
                  'Monitoring and control devices'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Wrench className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
            <h3 className="text-xl font-semibold text-green-700 mb-4">Infrastructure Planning</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-3">Site Selection</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Accessibility and connectivity</li>
                  <li>• Water and power availability</li>
                  <li>• Market proximity</li>
                  <li>• Environmental considerations</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800 mb-3">Design & Layout</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Efficient space utilization</li>
                  <li>• Workflow optimization</li>
                  <li>• Safety and compliance</li>
                  <li>• Future expansion plans</li>
                </ul>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-800 mb-3">Construction Timeline</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Phase-wise development</li>
                  <li>• Resource allocation</li>
                  <li>• Quality control measures</li>
                  <li>• Budget management</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'livestock-management',
      title: 'Livestock Management',
      icon: <Drumstick className="w-6 h-6" />,
      content: (
        <div className="space-y-6 animate-fadeIn">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Livestock Management</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
              <h3 className="text-xl font-semibold text-green-700 mb-4">Animal Health & Care</h3>
              <ul className="space-y-3">
                {[
                  'Regular health checkups and vaccinations',
                  'Proper nutrition and feeding schedules',
                  'Disease prevention and biosecurity',
                  'Breeding and reproduction management',
                  'Emergency veterinary care',
                  'Record keeping and monitoring'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Heart className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
              <h3 className="text-xl font-semibold text-green-700 mb-4">Housing & Environment</h3>
              <ul className="space-y-3">
                {[
                  'Proper ventilation and temperature control',
                  'Clean and comfortable bedding',
                  'Adequate space and movement areas',
                  'Protection from weather extremes',
                  'Sanitation and waste management',
                  'Safety and security measures'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Building className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
            <h3 className="text-xl font-semibold text-green-700 mb-4">Management Practices</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-medium text-orange-800 mb-3">Daily Operations</h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Feeding and watering schedules</li>
                  <li>• Health monitoring and observation</li>
                  <li>• Cleaning and maintenance</li>
                  <li>• Production tracking</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800 mb-3">Breeding & Genetics</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Selection of quality breeding stock</li>
                  <li>• Genetic improvement programs</li>
                  <li>• Reproduction management</li>
                  <li>• Performance evaluation</li>
                </ul>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-3">Production Management</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Yield optimization strategies</li>
                  <li>• Quality control measures</li>
                  <li>• Market demand alignment</li>
                  <li>• Cost-effective production</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'risk-factor',
      title: 'Risk Factor',
      icon: <AlertTriangle className="w-6 h-6" />,
      content: (
        <div className="space-y-6 animate-fadeIn">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Risk Assessment & Management</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
              <h3 className="text-xl font-semibold text-green-700 mb-4">Business Risks</h3>
              <ul className="space-y-3">
                {[
                  'Market price fluctuations',
                  'Competition and market saturation',
                  'Supply chain disruptions',
                  'Regulatory changes',
                  'Economic downturns',
                  'Technology obsolescence'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
              <h3 className="text-xl font-semibold text-green-700 mb-4">Operational Risks</h3>
              <ul className="space-y-3">
                {[
                  'Disease outbreaks and health issues',
                  'Natural disasters and climate change',
                  'Equipment failure and breakdowns',
                  'Labor shortages and skill gaps',
                  'Quality control failures',
                  'Safety and security incidents'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
            <h3 className="text-xl font-semibold text-green-700 mb-4">Risk Mitigation Strategies</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-red-50 rounded-lg">
                <h4 className="font-medium text-red-800 mb-3">Prevention Measures</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Regular health monitoring</li>
                  <li>• Quality control systems</li>
                  <li>• Safety protocols</li>
                  <li>• Training and education</li>
                </ul>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-3">Insurance & Protection</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Comprehensive insurance coverage</li>
                  <li>• Emergency fund allocation</li>
                  <li>• Diversification strategies</li>
                  <li>• Government scheme utilization</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800 mb-3">Contingency Planning</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Backup suppliers and markets</li>
                  <li>• Alternative production methods</li>
                  <li>• Crisis management protocols</li>
                  <li>• Recovery and restoration plans</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'financing',
      title: 'Financing',
      icon: <DollarSign className="w-6 h-6" />,
      content: (
        <div className="space-y-6 animate-fadeIn">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Capital & Financing</h2>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
            <h3 className="text-xl font-semibold text-green-700 mb-4">Investment Breakdown</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <tbody>
                  {currentBusiness.investmentBreakdown.map(([item, cost], i) => (
                    <tr key={i} className={`${i % 2 === 0 ? 'bg-green-50' : ''}`}>
                      <td className="py-3 px-4">{item}</td>
                      <td className="py-3 px-4 text-right font-medium">{cost}</td>
                    </tr>
                  ))}
                  <tr className="bg-green-100 font-bold">
                    <td className="py-3 px-4">Total Initial Investment</td>
                    <td className="py-3 px-4 text-right">{currentBusiness.initialInvestment}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
              <h3 className="text-xl font-semibold text-green-700 mb-4">Financing Options</h3>
              <ul className="space-y-3">
                {[
                  'NABARD Loan (6-12% interest, 3-5 years repayment)',
                  'Government Subsidy (various schemes available)',
                  'Microfinance options',
                  'Cooperative Societies membership',
                  'Personal Savings utilization'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <DollarSign className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
              <h3 className="text-xl font-semibold text-green-700 mb-4">Debt Management</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <span>Prioritize paying off high-interest loans</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>Use insurance and government subsidies</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'operations',
      title: 'Operations',
      icon: <Workflow className="w-6 h-6" />,
      content: (
        <div className="space-y-6 animate-fadeIn">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Operational Management</h2>
      
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
              <h3 className="text-xl font-semibold text-green-700 mb-4">Daily Operations</h3>
              <ul className="space-y-3">
                {[
                  'Establish daily routines',
                  'Monitor quality standards',
                  'Track inventory levels',
                  'Manage customer relations',
                  'Record financial transactions'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Workflow className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
      
            <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
              <h3 className="text-xl font-semibold text-green-700 mb-4">Sales & Distribution</h3>
              <ul className="space-y-3">
                {[
                  'Establish distribution channels',
                  'Develop marketing strategies',
                  'Track sales metrics',
                  'Build customer relationships',
                  'Explore online platforms'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <LineChart className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
      
            <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
              <h3 className="text-xl font-semibold text-green-700 mb-4">Quality Control</h3>
              <ul className="space-y-3">
                {[
                  'Maintain quality standards',
                  'Regular inspections',
                  'Customer feedback collection',
                  'Continuous improvement',
                  'Compliance with regulations'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <ScaleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'risk',
      title: 'Risk Management',
      icon: <Shield className="w-6 h-6" />,
      content: (
        <div className="space-y-6 animate-fadeIn">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Risk Management</h2>
      
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
              <h3 className="text-xl font-semibold text-green-700 mb-4">Insurance & Protection</h3>
              <ul className="space-y-3">
                {[
                  'Invest in comprehensive business insurance',
                  'Coverage for equipment and inventory',
                  'Protection against natural disasters',
                  'Liability coverage',
                  'Emergency fund allocation'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
      
            <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
              <h3 className="text-xl font-semibold text-green-700 mb-4">Risk Prevention</h3>
              <ul className="space-y-3">
                {[
                  'Regular safety inspections',
                  'Employee training programs',
                  'Quality control measures',
                  'Market research and analysis',
                  'Diversification strategies'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'growth',
      title: 'Scaling & Growth',
      icon: <Sprout className="w-6 h-6" />,
      content: (
        <div className="space-y-6 animate-fadeIn">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Scaling & Growth</h2>
      
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
              <h3 className="text-xl font-semibold text-green-700 mb-4">Growth Strategy</h3>
              <ul className="space-y-3">
                {[
                  'Start with manageable scale',
                  'Monitor expenses and revenue',
                  'Gradually expand operations',
                  'Upgrade infrastructure systematically',
                  'Introduce new products/services'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Sprout className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
      
            <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
              <h3 className="text-xl font-semibold text-green-700 mb-4">Sustainability</h3>
              <ul className="space-y-3">
                {[
                  'Implement efficient processes',
                  'Reduce waste and costs',
                  'Utilize renewable resources',
                  'Automate where possible',
                  'Optimize resource usage'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Leaf className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center mb-12 relative">
          <div className="relative z-10">
            <h1 className="text-5xl font-bold text-green-800 mb-4">
              Start Your {currentBusiness.title}
            </h1>
            <p className="text-xl text-green-600">
              Your complete guide to building a successful {currentBusiness.title.toLowerCase()} business
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg'
                    : 'bg-white text-green-700 hover:bg-green-50 shadow'
                }`}
              >
                <span className="mr-3">{section.icon}</span>
                <span className="font-medium">{section.title}</span>
                {activeSection === section.id ? (
                  <ChevronDown className="ml-auto w-5 h-5" />
                ) : (
                  <ChevronUp className="ml-auto w-5 h-5" />
                )}
              </button>
            ))}
          </div>

          <div className="lg:col-span-3 bg-white rounded-xl shadow-xl p-6 border border-green-100">
            {sections.find(s => s.id === activeSection)?.content}
          </div>
        </div>
      </div>
    </div>
  );
};

// Add required animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out forwards;
  }
`;
document.head.appendChild(style);

export default BusinessGuide; 