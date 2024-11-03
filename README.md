# Health-and-Safety-Framework-Viewer
# Health and Safety Framework Viewer

A React-based interactive viewer for managing and displaying health and safety documentation, specifically designed for lawn care and landscaping businesses. This component provides a searchable, filterable interface for accessing operational safety guidelines, personnel safety requirements, and emergency response procedures.

## Features

- 🔍 **Advanced Search Functionality**: Real-time search across all safety elements and control measures
- 🏷️ **Smart Filtering**: Filter between elements and control measures
- 📑 **Hierarchical Organization**: Structured display of safety information in collapsible sections
- ✨ **Highlighted Search Results**: Visual highlighting of search terms
- 📱 **Responsive Design**: Fully responsive layout suitable for all device sizes
- 🎨 **Modern UI**: Built with shadcn/ui components for a clean, professional look

## Prerequisites

- Node.js (version 14 or higher)
- React (version 16.8 or higher)
- @shadcn/ui components
- Lucide React icons

## Installation

1. Install the required dependencies:

```bash
npm install @shadcn/ui lucide-react
# or
yarn add @shadcn/ui lucide-react
```

2. Copy the component into your project structure:

```bash
src/
  components/
    HealthAndSafetyViewer.jsx
```

3. Import and use the component:

```jsx
import HealthAndSafetyViewer from './components/HealthAndSafetyViewer';

function App() {
  return (
    <div>
      <HealthAndSafetyViewer />
    </div>
  );
}
```

## Component Structure

The viewer is composed of several key components:

- `HealthAndSafetyViewer`: Main container component
- `SearchBar`: Handles search functionality
- `FilterButtons`: Manages content filtering
- `CategorySection`: Displays individual safety categories
- `HighlightText`: Handles search term highlighting

## Data Structure

The component expects health and safety data in the following format:

```javascript
{
  "sectionKey": {
    "title": "Section Title",
    "categories": {
      "categoryKey": {
        "name": "Category Name",
        "elements": ["Element 1", "Element 2"],
        "controlMeasures": ["Measure 1", "Measure 2"]
      }
    }
  }
}
```

## Features in Detail

### Search Functionality
- Real-time search across all content
- Highlights matching terms
- Automatically expands relevant sections
- Case-insensitive matching

### Filtering System
- Filter by:
  - All content
  - Elements only
  - Control measures only

### Section Management
- Collapsible sections for better organization
- Independent category expansion
- Clear visual hierarchy

## Styling

The component uses Tailwind CSS classes and shadcn/ui components for styling. Key style features include:

- Responsive grid layout
- Interactive hover states
- Consistent spacing and typography
- Accessible color contrast
- Clear visual hierarchy

## Customization

You can customize the component by:

1. Modifying the data structure in `healthAndSafetyData`
2. Adjusting the Tailwind CSS classes
3. Modifying the filter categories
4. Customizing the card and section layouts

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

## Support

For support, please open an issue in the GitHub repository.
