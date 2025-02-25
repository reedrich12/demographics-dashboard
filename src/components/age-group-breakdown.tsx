'use client';

import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';

/**
 * 1) Define a union of string literals for your valid age-group names.
 *    This ensures 'selectedAgeGroup' can only be one of these strings.
 */
type AgeGroupName =
  | 'Under 18'
  | '18-24'
  | '25-34'
  | '35-44'
  | '45-54'
  | '55-64'
  | '65-74'
  | '75+';

/**
 * 2) Define an interface for the items in the "gender" and "lineType" arrays.
 */
interface DistributionData {
  name: string;
  value: number;
  percentage: number;
}

/**
 * 3) Define an interface for each AgeGroupDetail entry:
 *    each age group has a 'gender' array and a 'lineType' array.
 */
interface AgeGroupDetail {
  gender: DistributionData[];
  lineType: DistributionData[];
}

/**
 * 4) Define an interface for the items in your top-level "ageGroups" array.
 */
interface AgeGroup {
  name: AgeGroupName;
  count: number;
  percentage: number;
}

/**
 * 5) Create a Record type to map each AgeGroupName to its details.
 */
const ageGroupDetails: Record<AgeGroupName, AgeGroupDetail> = {
  'Under 18': {
    gender: [
      { name: 'Female', value: 134, percentage: 59.29 },
      { name: 'Male', value: 77, percentage: 34.07 },
      { name: 'Unavailable/Other', value: 15, percentage: 6.64 }
    ],
    lineType: [
      { name: 'Landline', value: 95, percentage: 42.04 },
      { name: 'Mobile', value: 73, percentage: 32.30 },
      { name: 'Unknown', value: 39, percentage: 17.26 },
      { name: 'VOIP', value: 17, percentage: 7.52 },
      { name: 'Other', value: 2, percentage: 0.88 }
    ]
  },
  '18-24': {
    gender: [
      { name: 'Male', value: 79, percentage: 47.31 },
      { name: 'Female', value: 75, percentage: 44.91 },
      { name: 'Unavailable/Other', value: 13, percentage: 7.78 }
    ],
    lineType: [
      { name: 'Unknown', value: 72, percentage: 43.11 },
      { name: 'Mobile', value: 53, percentage: 31.74 },
      { name: 'Landline', value: 29, percentage: 17.37 },
      { name: 'VOIP', value: 10, percentage: 5.99 },
      { name: 'Other', value: 3, percentage: 1.80 }
    ]
  },
  '25-34': {
    gender: [
      { name: 'Female', value: 1075, percentage: 58.05 },
      { name: 'Male', value: 654, percentage: 35.31 },
      { name: 'Unavailable/Other', value: 123, percentage: 6.64 }
    ],
    lineType: [
      { name: 'Mobile', value: 903, percentage: 48.76 },
      { name: 'Landline', value: 369, percentage: 19.92 },
      { name: 'Unknown', value: 358, percentage: 19.33 },
      { name: 'VOIP', value: 189, percentage: 10.21 },
      { name: 'Other', value: 33, percentage: 1.78 }
    ]
  },
  '35-44': {
    gender: [
      { name: 'Female', value: 3379, percentage: 62.40 },
      { name: 'Male', value: 1733, percentage: 32.00 },
      { name: 'Unavailable/Other', value: 303, percentage: 5.60 }
    ],
    lineType: [
      { name: 'Mobile', value: 2412, percentage: 44.54 },
      { name: 'Landline', value: 1592, percentage: 29.40 },
      { name: 'VOIP', value: 685, percentage: 12.65 },
      { name: 'Unknown', value: 638, percentage: 11.78 },
      { name: 'Other', value: 88, percentage: 1.63 }
    ]
  },
  '45-54': {
    gender: [
      { name: 'Female', value: 4552, percentage: 60.80 },
      { name: 'Male', value: 2478, percentage: 33.10 },
      { name: 'Unavailable/Other', value: 457, percentage: 6.10 }
    ],
    lineType: [
      { name: 'Mobile', value: 2993, percentage: 39.98 },
      { name: 'Landline', value: 2719, percentage: 36.32 },
      { name: 'VOIP', value: 938, percentage: 12.53 },
      { name: 'Unknown', value: 704, percentage: 9.40 },
      { name: 'Other', value: 133, percentage: 1.78 }
    ]
  },
  '55-64': {
    gender: [
      { name: 'Female', value: 4051, percentage: 58.40 },
      { name: 'Male', value: 2476, percentage: 35.69 },
      { name: 'Unavailable/Other', value: 410, percentage: 5.91 }
    ],
    lineType: [
      { name: 'Mobile', value: 2830, percentage: 40.80 },
      { name: 'Landline', value: 2552, percentage: 36.79 },
      { name: 'VOIP', value: 757, percentage: 10.91 },
      { name: 'Unknown', value: 664, percentage: 9.57 },
      { name: 'Other', value: 134, percentage: 1.93 }
    ]
  },
  '65-74': {
    gender: [
      { name: 'Female', value: 2854, percentage: 54.51 },
      { name: 'Male', value: 2060, percentage: 39.34 },
      { name: 'Unavailable/Other', value: 322, percentage: 6.15 }
    ],
    lineType: [
      { name: 'Landline', value: 2070, percentage: 39.53 },
      { name: 'Mobile', value: 2044, percentage: 39.04 },
      { name: 'VOIP', value: 562, percentage: 10.73 },
      { name: 'Unknown', value: 448, percentage: 8.56 },
      { name: 'Other', value: 112, percentage: 2.14 }
    ]
  },
  '75+': {
    gender: [
      { name: 'Female', value: 2118, percentage: 52.46 },
      { name: 'Male', value: 1698, percentage: 42.06 },
      { name: 'Unavailable/Other', value: 221, percentage: 5.48 }
    ],
    lineType: [
      { name: 'Landline', value: 1964, percentage: 48.65 },
      { name: 'Mobile', value: 1343, percentage: 33.27 },
      { name: 'VOIP', value: 379, percentage: 9.39 },
      { name: 'Unknown', value: 294, percentage: 7.28 },
      { name: 'Other', value: 57, percentage: 1.41 }
    ]
  }
};

/**
 * 6) Define the array of top-level age groups with correct typing.
 */
const ageGroups: AgeGroup[] = [
  { name: 'Under 18', count: 226, percentage: 0.72 },
  { name: '18-24', count: 167, percentage: 0.53 },
  { name: '25-34', count: 1852, percentage: 5.91 },
  { name: '35-44', count: 5415, percentage: 17.27 },
  { name: '45-54', count: 7487, percentage: 23.88 },
  { name: '55-64', count: 6937, percentage: 22.12 },
  { name: '65-74', count: 5236, percentage: 16.70 },
  { name: '75+', count: 4037, percentage: 12.87 }
];

/**
 * 7) Type the component properly.
 *    We store 'selectedAgeGroup' in state as an AgeGroupName.
 */
const AgeGroupBreakdown: React.FC = () => {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroupName>('Under 18');

  // Chart colors
  const genderColors = ['#ff6384', '#36a2eb', '#ffce56'];
  const lineTypeColors = ['#4bc0c0', '#ff9f40', '#9966ff', '#c9cbcf', '#8a5fff'];
  const barColors = ['#3f51b5', '#f44336', '#4caf50', '#ff9800'];

  return (
    <div className="space-y-6">
      {/* --- FIRST CARD: Single Age Group Analysis --- */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Age Group Breakdown Analysis</CardTitle>
          <CardDescription>
            Detailed demographics by age group among unique contacts
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Age Group Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-6">
            {ageGroups.map((group: AgeGroup) => (
              <button
                key={group.name}
                className={`p-3 rounded-lg text-center transition-colors ${
                  selectedAgeGroup === group.name
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedAgeGroup(group.name)}
              >
                <div className="font-medium">{group.name}</div>
                <div className="text-sm">
                  {group.count.toLocaleString()} contacts ({group.percentage}%)
                </div>
              </button>
            ))}
          </div>

          {/* Quick Summary for the Selected Age Group */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-medium mb-2 text-center">
              {selectedAgeGroup} Age Group
            </h3>
            <div className="text-center mb-4">
              <span className="text-lg font-bold">
                {ageGroupDetails[selectedAgeGroup].gender[0].name}
              </span>
              make up
              <span className="text-lg font-bold">
                {' '}{ageGroupDetails[selectedAgeGroup].gender[0].percentage}%
              </span>
              of this age group, with
              <span className="text-lg font-bold">
                {' '}{ageGroupDetails[selectedAgeGroup].lineType[0].name}
              </span>
              phones being the most common at
              <span className="text-lg font-bold">
                {' '}{ageGroupDetails[selectedAgeGroup].lineType[0].percentage}%
              </span>.
            </div>
          </div>

          {/* Two Pie Charts: Gender & Line Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gender Distribution Chart */}
            <div>
              <h3 className="text-lg font-medium mb-2 text-center">
                Gender Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={ageGroupDetails[selectedAgeGroup].gender}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  >
                    {ageGroupDetails[selectedAgeGroup].gender.map(
                      (entry: DistributionData, index: number) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={genderColors[index % genderColors.length]}
                        />
                      )
                    )}
                  </Pie>
                  <Tooltip
                    formatter={(value, name, props) =>
                      [`${value} (${props.payload.percentage}%)`, name]
                    }
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4">
                <table className="min-w-full bg-white border">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border">Gender</th>
                      <th className="py-2 px-4 border">Count</th>
                      <th className="py-2 px-4 border">Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ageGroupDetails[selectedAgeGroup].gender.map(
                      (item: DistributionData, index: number) => (
                        <tr key={index}>
                          <td className="py-2 px-4 border">{item.name}</td>
                          <td className="py-2 px-4 border text-right">
                            {item.value.toLocaleString()}
                          </td>
                          <td className="py-2 px-4 border text-right">
                            {item.percentage}%
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Line Type Distribution Chart */}
            <div>
              <h3 className="text-lg font-medium mb-2 text-center">
                Line Type Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={ageGroupDetails[selectedAgeGroup].lineType}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  >
                    {ageGroupDetails[selectedAgeGroup].lineType.map(
                      (entry: DistributionData, index: number) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={lineTypeColors[index % lineTypeColors.length]}
                        />
                      )
                    )}
                  </Pie>
                  <Tooltip
                    formatter={(value, name, props) =>
                      [`${value} (${props.payload.percentage}%)`, name]
                    }
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4">
                <table className="min-w-full bg-white border">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border">Line Type</th>
                      <th className="py-2 px-4 border">Count</th>
                      <th className="py-2 px-4 border">Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ageGroupDetails[selectedAgeGroup].lineType.map(
                      (item: DistributionData, index: number) => (
                        <tr key={index}>
                          <td className="py-2 px-4 border">{item.name}</td>
                          <td className="py-2 px-4 border text-right">
                            {item.value.toLocaleString()}
                          </td>
                          <td className="py-2 px-4 border text-right">
                            {item.percentage}%
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* --- SECOND CARD: Age Group Comparisons --- */}
      <Card>
        <CardHeader>
          <CardTitle>Age Group Comparisons</CardTitle>
          <CardDescription>
            Comparing gender and line type distribution across age groups
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Gender Distribution Across Age Groups */}
            <div>
              <h3 className="text-lg font-medium mb-2">
                Gender Distribution Across Age Groups
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={ageGroups.map((group: AgeGroup) => {
                    const groupGender = ageGroupDetails[group.name].gender;
                    return {
                      name: group.name,
                      Female:
                        groupGender.find((g) => g.name === 'Female')
                          ?.percentage ?? 0,
                      Male:
                        groupGender.find((g) => g.name === 'Male')
                          ?.percentage ?? 0,
                      Other:
                        groupGender.find((g) => g.name === 'Unavailable/Other')
                          ?.percentage ?? 0
                    };
                  })}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => [`${value}%`, '']} />
                  <Legend />
                  <Bar dataKey="Female" fill={genderColors[0]} />
                  <Bar dataKey="Male" fill={genderColors[1]} />
                  <Bar dataKey="Other" fill={genderColors[2]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Line Type Distribution Across Age Groups */}
            <div>
              <h3 className="text-lg font-medium mb-2">
                Line Type Distribution Across Age Groups
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={ageGroups.map((group: AgeGroup) => {
                    const groupLineType = ageGroupDetails[group.name].lineType;
                    return {
                      name: group.name,
                      Mobile:
                        groupLineType.find((lt) => lt.name === 'Mobile')
                          ?.percentage ?? 0,
                      Landline:
                        groupLineType.find((lt) => lt.name === 'Landline')
                          ?.percentage ?? 0,
                      VOIP:
                        groupLineType.find((lt) => lt.name === 'VOIP')
                          ?.percentage ?? 0,
                      Unknown:
                        groupLineType.find((lt) => lt.name === 'Unknown')
                          ?.percentage ?? 0
                    };
                  })}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => [`${value}%`, '']} />
                  <Legend />
                  <Bar dataKey="Mobile" fill={lineTypeColors[0]} />
                  <Bar dataKey="Landline" fill={lineTypeColors[1]} />
                  <Bar dataKey="VOIP" fill={lineTypeColors[2]} />
                  <Bar dataKey="Unknown" fill={lineTypeColors[3]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgeGroupBreakdown;