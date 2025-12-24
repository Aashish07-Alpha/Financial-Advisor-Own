import React, { useState } from 'react';
import { Map, BookCheck, TrendingUp , User ,Heart, Sprout, ScaleIcon ,ArrowRight, ChevronDown, ChevronUp, DollarSign, Shield, Workflow, Building, Bird, LineChart, AlertTriangle, Info, Target, BookOpen, Egg, Leaf, Hammer} from 'lucide-react';

const PoultryFarmGuide = () => {
  const [activeSection, setActiveSection] = useState('overview');

  
  const RoadmapItem = ({ title, description, status, icon }) => (
    <div className="flex items-start gap-6 relative">
      <div className={`rounded-full p-4 ${'bg-green-500'
      } w-16 h-16 flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div className="flex-1 bg-green-50/50 rounded-xl p-6 shadow-sm">
        <h3 className={`text-xl font-semibold mb-2 ${
          'text-green-700' 
        }`}>
          {title}
        </h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
  
  

  const sections = [
    // {
    //   id: 'overview',
    //   title: 'Overview',
    //   icon: <Info className="w-6 h-6" />,
    //   content: (
    //     <div className="space-y-6 animate-fadeIn">
    //       <div className="bg-gradient-to-br from-white to-green-50 p-8 rounded-xl shadow-lg border border-green-100">
    //         <div>
    //           <h2 className="text-3xl font-bold text-green-800 mb-6">Welcome to Poultry Farming</h2>
    //           <p className="text-lg text-gray-700 leading-relaxed mb-6">
    //             This comprehensive guide will walk you through every aspect of starting and running a successful poultry farm, from initial planning to scaling for growth.
    //           </p>
    //           <div className="p-4 bg-white/80 backdrop-blur rounded-lg">
    //             <h3 className="text-xl font-semibold text-green-700 mb-3">Quick Facts</h3>
    //             <ul className="space-y-2">
    //               <li className="flex items-center gap-2">
    //                 <DollarSign className="w-5 h-5 text-green-600" />
    //                 <span>Initial Investment: ₹90,000</span>
    //               </li>
    //               <li className="flex items-center gap-2">
    //                 <Bird className="w-5 h-5 text-green-600" />
    //                 <span>Starting Capacity: 500 chicks</span>
    //               </li>
    //               <li className="flex items-center gap-2">
    //                 <Target className="w-5 h-5 text-green-600" />
    //                 <span>Location: Barabanki</span>
    //               </li>
    //             </ul>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   )
    // },
    {
        id: 'overview',
        title: 'Overview',
        icon: <Info className="w-6 h-6" />,
        content: (
          <div className="space-y-8 animate-fadeIn">
            {/* <div className="relative overflow-hidden bg-gradient-to-br from-white to-green-50 p-8 rounded-xl shadow-lg border border-green-100">
              
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-green-800 mb-6">Welcome to Poultry Farming</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  This comprehensive guide will walk you through every aspect of starting and running a successful poultry farm, from initial planning to scaling for growth.
                </p>
                <div className="p-4 bg-white/80 backdrop-blur rounded-lg">
                  <h3 className="text-xl font-semibold text-green-700 mb-3">Quick Facts</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <span>Initial Investment: ₹90,000</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Bird className="w-5 h-5 text-green-600" />
                      <span>Starting Capacity: 500 chicks</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-green-600" />
                      <span>Location: Barabanki</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div> */}
  
            {/* <div className="space-y-6">
              <h2 className="text-2xl font-bold text-green-800">Roadmap to Success</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <RoadmapCard
                  title="Initial Steps"
                  icon={Map}
                  items={[
                    "Research local market in Barabanki",
                    "Create detailed budget and financial plan",
                    "Apply for NABARD loan or government subsidies",
                    "Start with 500 chicks as initial flock"
                  ]}
                />
                
                <RoadmapCard
                  title="Preparation & Learning"
                  icon={BookCheck}
                  items={[
                    "Join government-sponsored training programs",
                    "Connect with local poultry farmers",
                    "Learn basic poultry farming techniques",
                    "Build essential infrastructure"
                  ]}
                />
                
                <RoadmapCard
                  title="Growth & Scaling"
                  icon={TrendingUp}
                  items={[
                    "Gradually increase production capacity",
                    "Explore additional revenue streams",
                    "Establish proper financial tracking",
                    "Reinvest profits for expansion"
                  ]}
                />
              </div>
  
              <div className="mt-8 bg-green-50 p-6 rounded-xl border border-green-100">
                <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center gap-2">
                  <User className="w-6 h-6" />
                  Support Network
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium text-green-700 mb-2">Professional Network</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <ArrowRight className="w-4 h-4 text-green-600" />
                        <span>Local veterinarians for health support</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="w-4 h-4 text-green-600" />
                        <span>Experienced poultry farmers as mentors</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium text-green-700 mb-2">Business Support</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <ArrowRight className="w-4 h-4 text-green-600" />
                        <span>Local cooperative societies</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="w-4 h-4 text-green-600" />
                        <span>Government agriculture department</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="space-y-8 mt-4 ml-16">
  <h3 className="text-2xl font-bold text-green-800 mb-6">Your Poultry Farm Journey</h3>
  
  <div className="space-y-12 relative">
    {/* Vertical line connecting the items */}
    <div className="absolute left-7 top-16 bottom-16 w-0.5 bg-green-200" />
    
    <RoadmapItem
      title="Initial Setup"
      description="Secure funding, acquire land, and establish basic infrastructure"
      status="completed"
      icon={<Building className="w-8 h-8 text-white" />}
    />
    
    <RoadmapItem
      title="Farm Development"
      description="Build poultry sheds, install equipment, and implement biosecurity measures"
      status="current"
      icon={<Hammer className="w-8 h-8 text-white" />}
    />
    
    <RoadmapItem
      title="Operations & Management"
      description="Start with initial flock and establish daily management routines"
      status="remaining"
      icon={<Bird className="w-8 h-8 text-white" />}
    />
    
    <RoadmapItem
      title="Scaling & Growth"
      description="Expand flock size, optimize operations, and increase market presence"
      status="remaining"
      icon={<Sprout className="w-8 h-8 text-white" />}
    />
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
            <h3 className="text-xl font-semibold text-green-700 mb-4">Financial Assessment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800 mb-3">Current Assets</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span>Savings: ₹20,000</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span>Cash: ₹10,000</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span>Fixed Deposit: ₹50,000</span>
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800 mb-3">Monthly Income</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-green-600" />
                    <span>Farming: ₹15,000</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Building className="w-5 h-5 text-green-600" />
                    <span>Grocery Shop: ₹5,000</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
            <h3 className="text-xl font-semibold text-green-700 mb-4">Market Research</h3>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <ul className="space-y-3">
                  {[
                    'Understand demand for poultry products (eggs and meat) in Barabanki',
                    'Investigate local competitors and suppliers',
                    'Establish potential buyers (shops, restaurants, markets)',
                    'Define business model: eggs, meat, or both',
                    'Set financial goals and calculate breakeven points',
                    'Analyze market trends and seasonal variations'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 mt-1 text-green-600 flex-shrink-0" />
                      <span>{item}</span>
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
                  {[
                    ['Buying 500 Day-Old Chicks (DOC)', '₹30,000'],
                    ['Poultry Shed Construction/Repair', '₹25,000'],
                    ['Feed and Watering Systems (3 months)', '₹15,000'],
                    ['Vaccination & Veterinary Care', '₹5,000'],
                    ['Equipment (Nest boxes, feeders, etc.)', '₹10,000'],
                    ['Miscellaneous (Transport, Licenses)', '₹5,000']
                  ].map(([item, cost], i) => (
                    <tr key={i} className={`${i % 2 === 0 ? 'bg-green-50' : ''}`}>
                      <td className="py-3 px-4">{item}</td>
                      <td className="py-3 px-4 text-right font-medium">{cost}</td>
                    </tr>
                  ))}
                  <tr className="bg-green-100 font-bold">
                    <td className="py-3 px-4">Total Initial Investment</td>
                    <td className="py-3 px-4 text-right">₹90,000</td>
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
                  'Government Subsidy (PVCF, up to 33%)',
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
                  <span>Prioritize paying off high-interest loans (₹30,000)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>Use crop insurance and government subsidies</span>
                </li>
              </ul>
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
          <h2 className="text-2xl font-bold text-green-800 mb-4">Infrastructure Setup</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
              <h3 className="text-xl font-semibold text-green-700 mb-4">Poultry Shed Requirements</h3>
              <ul className="space-y-3">
                {[
                  'Proper ventilation system installation',
                  'Concrete or slatted flooring',
                  'Weather-resistant roofing',
                  'Separate sections for growth stages',
                  'Adequate lighting system',
                  'Temperature control mechanisms'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Hammer className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
              <h3 className="text-xl font-semibold text-green-700 mb-4">Essential Equipment</h3>
              <ul className="space-y-3">
                {[
                  'Automated feeding systems',
                  'Water distribution system',
                  'Egg collection trays/boxes',
                  'Vaccination equipment',
                  'Waste management system',
                  'Storage facilities for feed'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Workflow className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
            <h3 className="text-xl font-semibold text-green-700 mb-4">Biosecurity Measures</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Access Control',
                  items: ['Footbaths installation', 'Hand sanitizing stations', 'Visitor protocols']
                },
                {
                  title: 'Disease Prevention',
                  items: ['Regular disinfection', 'Pest control', 'Isolation areas']
                },
                {
                  title: 'Waste Management',
                  items: ['Manure handling', 'Dead bird disposal', 'Cleaning protocols']
                }
              ].map((section, i) => (
                <div key={i} className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-3">{section.title}</h4>
                  <ul className="space-y-2">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-green-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
        id: 'livestock',
        title: 'Livestock Management',
        icon: <Bird className="w-6 h-6" />,
        content: (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Livestock Management</h2>
      
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
                <h3 className="text-xl font-semibold text-green-700 mb-4">Purchasing Guidelines</h3>
                <ul className="space-y-3">
                  {[
                    'Source 500 DOC from reliable hatchery (₹30,000)',
                    'Verify health certificates and vaccination history',
                    'Transport in temperature-controlled vehicles',
                    'Consider adding hens/broilers as farm scales',
                    'Inspect for physical abnormalities'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Bird className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
      
              <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
                <h3 className="text-xl font-semibold text-green-700 mb-4">Health & Welfare</h3>
                <ul className="space-y-3">
                  {[
                    'Establish regular vaccination schedules',
                    'Schedule routine veterinary checkups',
                    'Monitor for signs of illness daily',
                    'Maintain growth and health records',
                    'Implement strict biosecurity measures'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Heart className="w-5 h-5 text-green-600 flex-shrink-0" />
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
                    'Feed 2-3 times daily',
                    'Clean shed regularly',
                    'Monitor bird health',
                    'Track egg production',
                    'Record feed consumption'
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
                    'Proper packaging methods',
                    'Track sales metrics',
                    'Adjust marketing strategies',
                    'Maintain customer relationships'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <LineChart className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
      
              <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
                <h3 className="text-xl font-semibold text-green-700 mb-4">Inventory Control</h3>
                <ul className="space-y-3">
                  {[
                    'Monitor feed stock levels',
                    'Track vaccination inventory',
                    'Manage equipment supplies',
                    'Schedule regular restocking',
                    'Maintain emergency supplies'
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
                    'Invest in comprehensive poultry insurance',
                    'Coverage for disease outbreaks',
                    'Protection against natural disasters',
                    'Theft and accident coverage',
                    'Emergency fund allocation (₹10,000)'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Shield className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
      
              <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
                <h3 className="text-xl font-semibold text-green-700 mb-4">Disease Prevention</h3>
                <ul className="space-y-3">
                  {[
                    'Regular health checkups',
                    'Vaccination program implementation',
                    'Bird flu prevention measures',
                    'Newcastle disease control',
                    'Strict hygiene protocols'
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
                    'Start with 500 chicks initially',
                    'Monitor expenses and revenue',
                    'Gradually increase flock size',
                    'Upgrade infrastructure systematically',
                    'Introduce specialized birds'
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
                    'Install solar panels for energy',
                    'Implement composting systems',
                    'Utilize efficient farming techniques',
                    'Automate feeding systems',
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
      },
      {
        id: 'risks',
        title: 'Risk Factors',
        icon: <AlertTriangle className="w-6 h-6" />,
        content: (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Associated Risks</h2>
      
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
                <h3 className="text-xl font-semibold text-green-700 mb-4">Key Risk Factors</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: 'Disease Outbreaks',
                      description: 'Poultry is highly susceptible to diseases. Sudden outbreaks can cause significant losses.'
                    },
                    {
                      title: 'Cost Fluctuations',
                      description: 'Feed and medicine costs can vary significantly, affecting profit margins.'
                    },
                    {
                      title: 'Debt Management',
                      description: 'High-interest loans can lead to cash flow issues during off-seasons.'
                    },
                    {
                      title: 'Market Volatility',
                      description: 'Prices for poultry products can fluctuate based on market conditions.'
                    },
                    {
                      title: 'Capital Requirements',
                      description: 'Initial investment needs and ongoing capital requirements can strain resources.'
                    },
                    {
                      title: 'Regulatory Compliance',
                      description: 'Must maintain compliance with local regulations and health certifications.'
                    }
                  ].map((risk, i) => (
                    <div key={i} className="p-4 bg-red-50 rounded-lg">
                      <h4 className="font-medium text-red-800 mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        {risk.title}
                      </h4>
                      <p className="text-red-600">{risk.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      }
    // {
    //   id: 'overview',
    //   title: 'Overview',
    //   icon: <Info className="w-6 h-6" />,
    //   content: (
    //     <div className="space-y-6 animate-fadeIn">
    //       <div className="relative overflow-hidden bg-gradient-to-br from-white to-green-50 p-8 rounded-xl shadow-lg border border-green-100">
           
    //         <div className="relative z-10">
    //           <h2 className="text-3xl font-bold text-green-800 mb-6">Welcome to Poultry Farming</h2>
    //           <p className="text-lg text-gray-700 leading-relaxed mb-6">
    //             This comprehensive guide will walk you through every aspect of starting and running a successful poultry farm, from initial planning to scaling for growth.
    //           </p>
    //           <div className="p-4 bg-white/80 backdrop-blur rounded-lg">
    //             <h3 className="text-xl font-semibold text-green-700 mb-3">Quick Facts</h3>
    //             <ul className="space-y-2">
    //               <li className="flex items-center gap-2">
    //                 <DollarSign className="w-5 h-5 text-green-600" />
    //                 <span>Initial Investment: ₹90,000</span>
    //               </li>
    //               <li className="flex items-center gap-2">
    //                 <Bird className="w-5 h-5 text-green-600" />
    //                 <span>Starting Capacity: 500 chicks</span>
    //               </li>
    //               <li className="flex items-center gap-2">
    //                 <Target className="w-5 h-5 text-green-600" />
    //                 <span>Location: Barabanki</span>
    //               </li>
    //             </ul>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   )
    // },
    // {
    //   id: 'planning',
    //   title: 'Planning',
    //   icon: <Target className="w-6 h-6" />,
    //   content: (
    //     <div className="space-y-6 animate-fadeIn">
    //       <h2 className="text-2xl font-bold text-green-800 mb-4">Feasibility & Planning</h2>
          
    //       <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
    //         <h3 className="text-xl font-semibold text-green-700 mb-4">Financial Assessment</h3>
    //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //           <div className="p-4 bg-green-50 rounded-lg">
    //             <h4 className="font-medium text-green-800 mb-3">Current Assets</h4>
    //             <ul className="space-y-3">
    //               <li className="flex items-center gap-2">
    //                 <DollarSign className="w-5 h-5 text-green-600" />
    //                 <span>Savings: ₹20,000</span>
    //               </li>
    //               <li className="flex items-center gap-2">
    //                 <DollarSign className="w-5 h-5 text-green-600" />
    //                 <span>Cash: ₹10,000</span>
    //               </li>
    //               <li className="flex items-center gap-2">
    //                 <DollarSign className="w-5 h-5 text-green-600" />
    //                 <span>Fixed Deposit: ₹50,000</span>
    //               </li>
    //             </ul>
    //           </div>
    //           <div className="p-4 bg-green-50 rounded-lg">
    //             <h4 className="font-medium text-green-800 mb-3">Monthly Income</h4>
    //             <ul className="space-y-3">
    //               <li className="flex items-center gap-2">
    //                 <Leaf className="w-5 h-5 text-green-600" />
    //                 <span>Farming: ₹15,000</span>
    //               </li>
    //               <li className="flex items-center gap-2">
    //                 <Building className="w-5 h-5 text-green-600" />
    //                 <span>Grocery Shop: ₹5,000</span>
    //               </li>
    //             </ul>
    //           </div>
    //         </div>
    //       </div>

    //       <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
    //         <h3 className="text-xl font-semibold text-green-700 mb-4">Market Research</h3>
    //         <div className="space-y-4">
    //           <div className="p-4 bg-green-50 rounded-lg">
    //             <ul className="space-y-3">
    //               {[
    //                 'Understand demand for poultry products (eggs and meat) in Barabanki',
    //                 'Investigate local competitors and suppliers',
    //                 'Establish potential buyers (shops, restaurants, markets)'
    //               ].map((item, i) => (
    //                 <li key={i} className="flex items-start gap-2">
    //                   <ArrowRight className="w-4 h-4 mt-1 text-green-600 flex-shrink-0" />
    //                   <span>{item}</span>
    //                 </li>
    //               ))}
    //             </ul>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   )
    // },
    // {
    //   id: 'financing',
    //   title: 'Financing',
    //   icon: <DollarSign className="w-6 h-6" />,
    //   content: (
    //     <div className="space-y-6 animate-fadeIn">
    //       <h2 className="text-2xl font-bold text-green-800 mb-4">Capital & Financing</h2>
          
    //       <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
    //         <h3 className="text-xl font-semibold text-green-700 mb-4">Investment Breakdown</h3>
    //         <div className="overflow-x-auto">
    //           <table className="min-w-full">
    //             <tbody>
    //               {[
    //                 ['Buying 500 Day-Old Chicks (DOC)', '₹30,000'],
    //                 ['Poultry Shed Construction/Repair', '₹25,000'],
    //                 ['Feed and Watering Systems (3 months)', '₹15,000'],
    //                 ['Vaccination & Veterinary Care', '₹5,000'],
    //                 ['Equipment (Nest boxes, feeders, etc.)', '₹10,000'],
    //                 ['Miscellaneous (Transport, Licenses)', '₹5,000']
    //               ].map(([item, cost], i) => (
    //                 <tr key={i} className={`${i % 2 === 0 ? 'bg-green-50' : ''}`}>
    //                   <td className="py-3 px-4">{item}</td>
    //                   <td className="py-3 px-4 text-right font-medium">{cost}</td>
    //                 </tr>
    //               ))}
    //               <tr className="bg-green-100 font-bold">
    //                 <td className="py-3 px-4">Total Initial Investment</td>
    //                 <td className="py-3 px-4 text-right">₹90,000</td>
    //               </tr>
    //             </tbody>
    //           </table>
    //         </div>
    //       </div>

    //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //         <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
    //           <h3 className="text-xl font-semibold text-green-700 mb-4">Financing Options</h3>
    //           <ul className="space-y-3">
    //             {[
    //               'NABARD Loan (6-12% interest)',
    //               'Government Subsidy (PVCF)',
    //               'Microfinance options',
    //               'Cooperative Societies',
    //               'Personal Savings'
    //             ].map((item, i) => (
    //               <li key={i} className="flex items-start gap-2">
    //                 <DollarSign className="w-5 h-5 text-green-600 flex-shrink-0" />
    //                 <span>{item}</span>
    //               </li>
    //             ))}
    //           </ul>
    //         </div>
            
    //         <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
    //           <h3 className="text-xl font-semibold text-green-700 mb-4">Debt Management</h3>
    //           <ul className="space-y-3">
    //             <li className="flex items-start gap-2">
    //               <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
    //               <span>Prioritize paying off high-interest loans (₹30,000)</span>
    //             </li>
    //             <li className="flex items-start gap-2">
    //               <Shield className="w-5 h-5 text-green-600 flex-shrink-0" />
    //               <span>Use crop insurance and government subsidies</span>
    //             </li>
    //           </ul>
    //         </div>
    //       </div>
    //     </div>
    //   )
    // },
    // ... Additional sections following the same pattern ...
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center mb-12 relative">
         
          <div className="relative z-10">
            <h1 className="text-5xl font-bold text-green-800 mb-4">
              Start Your Poultry Farm
            </h1>
            <p className="text-xl text-green-600">
              Your complete guide to building a successful poultry business
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

export default PoultryFarmGuide;