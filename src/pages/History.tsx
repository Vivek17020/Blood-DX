
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search, Calendar, Download, Trash2, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const HistoryPage = () => {
  // Mock data for test history - in a real app this would come from a database
  const testHistory = [
    {
      id: '1',
      date: '2025-05-01',
      predictions: [
        { disease: 'Type 2 Diabetes', riskLevel: 'high' }
      ],
      labName: 'HealthFirst Labs'
    },
    {
      id: '2',
      date: '2025-04-15',
      predictions: [
        { disease: 'Type 2 Diabetes', riskLevel: 'high' },
        { disease: 'Anemia', riskLevel: 'low' }
      ],
      labName: 'MedExpress Diagnostics'
    },
    {
      id: '3',
      date: '2025-03-02',
      predictions: [
        { disease: 'Type 2 Diabetes', riskLevel: 'moderate' }
      ],
      labName: 'City Medical Labs'
    },
    {
      id: '4',
      date: '2025-02-14',
      predictions: [
        { disease: 'Healthy', riskLevel: 'low' }
      ],
      labName: 'LifeCare Labs'
    },
    {
      id: '5',
      date: '2025-01-05',
      predictions: [
        { disease: 'Anemia', riskLevel: 'moderate' },
        { disease: 'Thrombocytopenia', riskLevel: 'low' }
      ],
      labName: 'HealthFirst Labs'
    }
  ];
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-blood-blue mb-4 md:mb-0">Test History</h1>
            
            <div className="flex w-full md:w-auto gap-2">
              <div className="relative w-full md:w-64">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  placeholder="Search reports..." 
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="icon" className="flex-shrink-0">
                <Calendar className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Card>
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-lg">Your Blood Test Reports</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Lab</TableHead>
                    <TableHead>Findings</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testHistory.map(test => (
                    <TableRow key={test.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-gray-400" />
                          {formatDate(test.date)}
                        </div>
                      </TableCell>
                      <TableCell>{test.labName}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {test.predictions.map((prediction, idx) => (
                            <Badge 
                              key={idx}
                              variant="outline"
                              className={
                                prediction.riskLevel === 'high' ? 'border-red-300 text-red-700 bg-red-50' :
                                prediction.riskLevel === 'moderate' ? 'border-amber-300 text-amber-700 bg-amber-50' :
                                'border-green-300 text-green-700 bg-green-50'
                              }
                            >
                              {prediction.disease}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <div className="mt-12 p-6 bg-blue-50 border border-blue-100 rounded-lg">
            <h3 className="text-lg font-medium text-blood-blue mb-2">Track Your Progress</h3>
            <p className="text-gray-700 mb-4">
              Regular monitoring of your blood test results helps track health improvements over time. 
              Our analysis shows how your key metrics have changed with each test.
            </p>
            <div className="text-center">
              <Button className="bg-blood-blue hover:bg-blood-blue/90">
                View Health Trends
              </Button>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <h3 className="font-medium mb-2">Most Recent Test</h3>
              <p className="text-gray-600 text-sm">{formatDate(testHistory[0].date)}</p>
              <div className="mt-2">
                {testHistory[0].predictions.map((prediction, idx) => (
                  <Badge 
                    key={idx}
                    variant="outline"
                    className={
                      prediction.riskLevel === 'high' ? 'border-red-300 text-red-700 bg-red-50' :
                      prediction.riskLevel === 'moderate' ? 'border-amber-300 text-amber-700 bg-amber-50' :
                      'border-green-300 text-green-700 bg-green-50'
                    }
                  >
                    {prediction.disease}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <h3 className="font-medium mb-2">Tests This Year</h3>
              <p className="text-2xl font-bold text-blood-blue">{testHistory.length}</p>
              <p className="text-gray-600 text-sm">Last test: {formatDate(testHistory[0].date)}</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <h3 className="font-medium mb-2">Health Improvement</h3>
              <p className="text-gray-600 text-sm">Diabetes Risk</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Reduced by 15% since first test</p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white mt-16 py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-500 text-sm">
                © 2025 Blood-DX. All rights reserved.
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Not a substitute for professional medical advice.
              </p>
            </div>
            <div className="flex space-x-4">
              <Link to="/about" className="text-gray-500 hover:text-blood-blue text-sm">About</Link>
              <Link to="/history" className="text-gray-500 hover:text-blood-blue text-sm">History</Link>
              <Link to="/help" className="text-gray-500 hover:text-blood-blue text-sm">Help</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HistoryPage;
