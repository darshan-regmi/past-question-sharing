import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FilterOptions } from "@/lib/types";

interface FilterBarProps {
  options: FilterOptions;
  onFilterChange: (options: FilterOptions) => void;
  subjects?: string[];
  years?: string[];
  tags?: string[];
  showDifficulty?: boolean;
}

export function FilterBar({
  options,
  onFilterChange,
  subjects = [],
  years = [],
  tags = [],
  showDifficulty = false,
}: FilterBarProps) {
  const [searchQuery, setSearchQuery] = React.useState(options.searchQuery || "");
  const [selectedTags, setSelectedTags] = React.useState<string[]>(options.tags || []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ ...options, searchQuery });
  };

  const handleSubjectChange = (value: string) => {
    onFilterChange({ ...options, subject: value || undefined });
  };

  const handleYearChange = (value: string) => {
    onFilterChange({ ...options, year: value || undefined });
  };

  const handleDifficultyChange = (value: string) => {
    onFilterChange({ 
      ...options, 
      difficulty: (value as 'easy' | 'medium' | 'hard' | undefined) || undefined 
    });
  };

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    
    setSelectedTags(newTags);
    onFilterChange({ ...options, tags: newTags.length > 0 ? newTags : undefined });
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
    onFilterChange({});
  };

  const hasActiveFilters = !!(
    options.searchQuery ||
    options.subject ||
    options.year ||
    options.difficulty ||
    (options.tags && options.tags.length > 0)
  );

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button type="submit">Search</Button>
      </form>

      <div className="flex flex-wrap gap-2 items-center">
        {subjects.length > 0 && (
          <Select value={options.subject || ""} onValueChange={handleSubjectChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Subjects</SelectItem>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {years.length > 0 && (
          <Select value={options.year || ""} onValueChange={handleYearChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Years</SelectItem>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {showDifficulty && (
          <Select 
            value={options.difficulty || ""} 
            onValueChange={handleDifficultyChange}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Difficulties</SelectItem>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        )}

        {tags.length > 0 && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="h-10">
                <Filter className="h-4 w-4 mr-2" />
                Tags
                {selectedTags.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {selectedTags.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Filter by tags</h4>
                <div className="flex flex-wrap gap-1">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleTagToggle(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}

        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleClearFilters}
            className="ml-auto"
          >
            <X className="h-4 w-4 mr-1" />
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
}
