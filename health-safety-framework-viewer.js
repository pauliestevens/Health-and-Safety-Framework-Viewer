import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronRight, Search, Filter } from 'lucide-react';
import healthAndSafetyData from './health-safety-data.json';

const SearchBar = ({ onSearch }) => (
  <div className="relative mb-6">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
    <input
      type="text"
      placeholder="Search elements, measures, or categories..."
      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={(e) => onSearch(e.target.value)}
    />
  </div>
);

const FilterButtons = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'elements', label: 'Elements' },
    { id: 'controlMeasures', label: 'Control Measures' },
  ];

  return (
    <div className="flex gap-2 mb-6">
      <Filter className="w-5 h-5 text-gray-500 mr-2" />
      {filters.map(filter => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-4 py-1 rounded-full text-sm ${
            activeFilter === filter.id 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

const HighlightText = ({ text, searchTerm }) => {
  if (!searchTerm) return text;
  
  const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
  return (
    <span>
      {parts.map((part, index) => 
        part.toLowerCase() === searchTerm.toLowerCase() ? (
          <span key={index} className="bg-yellow-200">{part}</span>
        ) : (
          part
        )
      )}
    </span>
  );
};

const CategorySection = ({ name, elements, controlMeasures, searchTerm, filterType }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const matchesSearch = useMemo(() => {
    if (!searchTerm) return true;
    const lowercaseSearch = searchTerm.toLowerCase();
    
    const nameMatches = name.toLowerCase().includes(lowercaseSearch);
    const elementsMatch = elements.some(e => e.toLowerCase().includes(lowercaseSearch));
    const measuresMatch = controlMeasures.some(m => m.toLowerCase().includes(lowercaseSearch));
    
    return nameMatches || elementsMatch || measuresMatch;
  }, [name, elements, controlMeasures, searchTerm]);

  const filteredElements = useMemo(() => {
    if (!searchTerm) return elements;
    return elements.filter(e => e.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [elements, searchTerm]);

  const filteredMeasures = useMemo(() => {
    if (!searchTerm) return controlMeasures;
    return controlMeasures.filter(m => m.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [controlMeasures, searchTerm]);

  if (!matchesSearch) return null;

  const showElements = filterType === 'all' || filterType === 'elements';
  const showMeasures = filterType === 'all' || filterType === 'controlMeasures';
  
  return (
    <div className="border rounded-lg p-4 mb-4">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left font-medium mb-2"
      >
        <span>{name}</span>
        {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
      </button>
      
      {isExpanded && (
        <div className="grid grid-cols-2 gap-4 mt-2">
          {showElements && (
            <div>
              <h4 className="font-medium mb-2">Elements:</h4>
              <ul className="list-disc pl-5">
                {filteredElements.map((element, index) => (
                  <li key={index} className="mb-1">
                    <HighlightText text={element} searchTerm={searchTerm} />
                  </li>
                ))}
              </ul>
            </div>
          )}
          {showMeasures && (
            <div>
              <h4 className="font-medium mb-2">Control Measures:</h4>
              <ul className="list-disc pl-5">
                {filteredMeasures.map((measure, index) => (
                  <li key={index} className="mb-1">
                    <HighlightText text={measure} searchTerm={searchTerm} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const HealthAndSafetyViewer = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term) {
      setExpandedSection('all');
    } else {
      setExpandedSection(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">LawnScience St Albans - Health & Safety Framework</h1>
      
      <SearchBar onSearch={handleSearch} />
      <FilterButtons activeFilter={filterType} onFilterChange={setFilterType} />
      
      {Object.entries(healthAndSafetyData).map(([key, section]) => (
        <Card key={key} className="mb-6">
          <CardHeader>
            <CardTitle 
              className="cursor-pointer"
              onClick={() => setExpandedSection(expandedSection === key ? null : key)}
            >
              <div className="flex items-center">
                {expandedSection === key || expandedSection === 'all' ? 
                  <ChevronDown className="w-5 h-5 mr-2" /> : 
                  <ChevronRight className="w-5 h-5 mr-2" />}
                {section.title}
              </div>
            </CardTitle>
          </CardHeader>
          
          {(expandedSection === key || expandedSection === 'all') && (
            <CardContent>
              {Object.values(section.categories).map((category, index) => (
                <CategorySection 
                  key={index}
                  name={category.name}
                  elements={category.elements}
                  controlMeasures={category.controlMeasures}
                  searchTerm={searchTerm}
                  filterType={filterType}
                />
              ))}
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
};

export default HealthAndSafetyViewer;
