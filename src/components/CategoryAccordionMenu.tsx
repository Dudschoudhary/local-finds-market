// filepath: /home/mentem/Dudaram/localmart/frountend/src/components/CategoryAccordionMenu.tsx
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { categories, SubCategory } from '@/data/categories';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface CategoryAccordionMenuProps {
  onSelect?: (categoryId: string) => void;
  className?: string;
}

const CategoryAccordionMenu = ({ onSelect, className }: CategoryAccordionMenuProps) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  // Track which main category is open (only one at a time)
  const [openMainCategory, setOpenMainCategory] = useState<string | null>(null);
  // Track which sub-category with nested items is open
  const [openSubCategory, setOpenSubCategory] = useState<string | null>(null);
  
  // Refs for scrolling
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleMainCategoryClick = (categoryId: string) => {
    // Toggle: if already open, close it; otherwise open it and close others
    if (openMainCategory === categoryId) {
      setOpenMainCategory(null);
      setOpenSubCategory(null);
    } else {
      setOpenMainCategory(categoryId);
      setOpenSubCategory(null); // Reset sub-category when switching main category
      
      // Scroll the clicked category into view after a small delay for animation
      setTimeout(() => {
        categoryRefs.current[categoryId]?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  };

  const handleSubCategoryClick = (subCategory: SubCategory, e: React.MouseEvent) => {
    if (subCategory.subItems && subCategory.subItems.length > 0) {
      // Has nested items - toggle expansion
      e.stopPropagation();
      if (openSubCategory === subCategory.id) {
        setOpenSubCategory(null);
      } else {
        setOpenSubCategory(subCategory.id);
      }
    } else {
      // No nested items - navigate to products
      handleCategorySelect(subCategory.id);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    if (onSelect) {
      onSelect(categoryId);
    } else {
      navigate(`/products?category=${categoryId}`);
    }
  };

  return (
    <div className={cn("w-full bg-card rounded-xl border border-border overflow-hidden", className)}>
      {categories.map((category) => (
        <div 
          key={category.id} 
          className="border-b border-border last:border-b-0"
          ref={(el) => { categoryRefs.current[category.id] = el; }}
        >
          {/* Main Category Header */}
          <button
            onClick={() => handleMainCategoryClick(category.id)}
            className={cn(
              "w-full flex items-center justify-between p-4 text-left hover:bg-accent/50 transition-colors",
              openMainCategory === category.id && "bg-accent/30"
            )}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{category.icon}</span>
              <span className="font-medium text-foreground">
                {category.name[language]}
              </span>
            </div>
            <ChevronDown 
              className={cn(
                "h-5 w-5 text-muted-foreground transition-transform duration-200",
                openMainCategory === category.id && "rotate-180"
              )} 
            />
          </button>

          {/* Sub-categories Panel */}
          <div
            className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out",
              openMainCategory === category.id ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <div className="bg-secondary/30 py-2">
              {category.subCategories.map((sub) => (
                <div key={sub.id}>
                  {/* Sub-category Item */}
                  <button
                    onClick={(e) => handleSubCategoryClick(sub, e)}
                    className={cn(
                      "w-full flex items-center justify-between px-6 py-2.5 text-left hover:bg-accent/50 transition-colors",
                      openSubCategory === sub.id && "bg-accent/30"
                    )}
                  >
                    <span className="text-sm text-foreground/90">
                      {sub.name[language]}
                    </span>
                    {sub.subItems && sub.subItems.length > 0 && (
                      <ChevronRight 
                        className={cn(
                          "h-4 w-4 text-muted-foreground transition-transform duration-200",
                          openSubCategory === sub.id && "rotate-90"
                        )} 
                      />
                    )}
                  </button>

                  {/* Nested Sub-items Panel */}
                  {sub.subItems && sub.subItems.length > 0 && (
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-200 ease-in-out bg-secondary/50",
                        openSubCategory === sub.id ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
                      )}
                    >
                      {sub.subItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleCategorySelect(item.id)}
                          className="w-full px-10 py-2 text-left text-sm text-muted-foreground hover:text-primary hover:bg-accent/30 transition-colors"
                        >
                          {item.name[language]}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* "View All" option for main category */}
              <button
                onClick={() => handleCategorySelect(category.id)}
                className="w-full px-6 py-2.5 text-left text-sm font-medium text-primary hover:bg-accent/50 transition-colors border-t border-border/50 mt-1"
              >
                View All {category.name[language]} →
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryAccordionMenu;
