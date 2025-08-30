import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface Employee {
  id: string;
  name: string;
  role: string;
}

interface Department {
  id: string;
  name: string;
  employees: Employee[];
}

interface EmployeeSidebarProps {
  selectedEmployees: Set<string>;
  selectedDepartments: Set<string>;
  onEmployeeSelect: (employeeId: string, selected: boolean) => void;
  onDepartmentSelect: (departmentId: string, selected: boolean) => void;
}

const mockDepartments: Department[] = [
  {
    id: "civil",
    name: "Civil Engineering",
    employees: [
      { id: "civil-1", name: "Rajesh Kumar", role: "Senior Civil Engineer" },
      { id: "civil-2", name: "Priya Nair", role: "Assistant Engineer" },
      { id: "civil-3", name: "Mohammed Ali", role: "Site Supervisor" },
    ]
  },
  {
    id: "electrical",
    name: "Electrical Engineering",
    employees: [
      { id: "electrical-1", name: "Arun Pillai", role: "Chief Electrical Engineer" },
      { id: "electrical-2", name: "Kavitha Menon", role: "Control Systems Engineer" },
      { id: "electrical-3", name: "Suresh Babu", role: "Maintenance Technician" },
    ]
  },
  {
    id: "operations",
    name: "Operations",
    employees: [
      { id: "operations-1", name: "Deepak Sharma", role: "Operations Manager" },
      { id: "operations-2", name: "Lakshmi Das", role: "Train Controller" },
      { id: "operations-3", name: "Ravi Krishnan", role: "Station Master" },
    ]
  },
  {
    id: "safety",
    name: "Safety & Security",
    employees: [
      { id: "safety-1", name: "Vinod Kumar", role: "Safety Officer" },
      { id: "safety-2", name: "Meera Nair", role: "Security Supervisor" },
    ]
  },
  {
    id: "hr",
    name: "Human Resources",
    employees: [
      { id: "hr-1", name: "Anitha Raj", role: "HR Manager" },
      { id: "hr-2", name: "Sanjay Menon", role: "Training Coordinator" },
    ]
  }
];

const EmployeeSidebar = ({ 
  selectedEmployees, 
  selectedDepartments, 
  onEmployeeSelect, 
  onDepartmentSelect 
}: EmployeeSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedDepartments, setExpandedDepartments] = useState<Set<string>>(new Set());

  const toggleDepartment = (departmentId: string) => {
    setExpandedDepartments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(departmentId)) {
        newSet.delete(departmentId);
      } else {
        newSet.add(departmentId);
      }
      return newSet;
    });
  };

  const isDepartmentSelected = (department: Department) => {
    return department.employees.every(emp => selectedEmployees.has(emp.id));
  };

  const isDepartmentPartiallySelected = (department: Department) => {
    return department.employees.some(emp => selectedEmployees.has(emp.id)) && 
           !department.employees.every(emp => selectedEmployees.has(emp.id));
  };

  const handleDepartmentCheck = (department: Department, checked: boolean) => {
    department.employees.forEach(emp => {
      onEmployeeSelect(emp.id, checked);
    });
    onDepartmentSelect(department.id, checked);
  };

  const filteredDepartments = mockDepartments.map(dept => ({
    ...dept,
    employees: dept.employees.filter(emp => 
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(dept => 
    dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.employees.length > 0
  );

  return (
    <div className="h-full flex flex-col">
      {/* Search Bar */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="search"
            placeholder="Search for Employee..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Department Tree */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {filteredDepartments.map((department) => (
            <div key={department.id} className="space-y-1">
              {/* Department Header */}
              <div className="flex items-center gap-2 py-2">
                <button
                  onClick={() => toggleDepartment(department.id)}
                  className="p-1 hover:bg-muted rounded transition-colors"
                >
                  {expandedDepartments.has(department.id) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                
                <Checkbox
                  id={`dept-${department.id}`}
                  checked={isDepartmentSelected(department)}
                  onCheckedChange={(checked) => 
                    handleDepartmentCheck(department, checked as boolean)
                  }
                  className={cn(
                    isDepartmentPartiallySelected(department) && "data-[state=checked]:bg-muted-foreground"
                  )}
                />
                
                <label 
                  htmlFor={`dept-${department.id}`}
                  className="text-sm font-medium text-foreground cursor-pointer flex-1"
                >
                  {department.name}
                </label>
              </div>

              {/* Employees */}
              {expandedDepartments.has(department.id) && (
                <div className="ml-6 space-y-1">
                  {department.employees.map((employee) => (
                    <div key={employee.id} className="flex items-center gap-2 py-1">
                      <Checkbox
                        id={`emp-${employee.id}`}
                        checked={selectedEmployees.has(employee.id)}
                        onCheckedChange={(checked) => 
                          onEmployeeSelect(employee.id, checked as boolean)
                        }
                      />
                      <label 
                        htmlFor={`emp-${employee.id}`}
                        className="text-sm text-foreground cursor-pointer flex-1"
                      >
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-xs text-muted-foreground">{employee.role}</div>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeSidebar;