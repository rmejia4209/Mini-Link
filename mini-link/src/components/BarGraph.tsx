import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, 
  Tooltip, Legend, Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Filler
);


interface BarGraphPropTypes {
  isLoading: boolean;
  labels: string[];
  values: number[];
}

function BarGraph({ isLoading, labels, values }: BarGraphPropTypes) {
  const [colors, setColors] = useState({
    fillColor: '#000000',
    borderColor: '#000000',
    neutral: '#000000',
    neutralContent: '#000000'
  });


  const data = {
    
    labels: labels,
    datasets: [{
      data: values,
      backgroundColor: colors.fillColor,
      borderColor: colors.borderColor,
      borderWidth: 2
    }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Visits by Month',
        color: colors.neutral,
        font: {
          size: 24,
          weight: 'bolder' as const
        }
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: colors.neutralContent, // Removes grid background
        },
        ticks: {
          color: colors.neutral,
          maxRotation: 45,
          minRotation: 45,
          font: {
            family: 'Arial' as const,
            size: 14,
            weight: 'bold' as const
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: colors.neutralContent, 
        },
        ticks: {
          color: colors.neutral,
          font: {
            size: 14, // Font size for y-axis labels
            weight: 'bold' as const, // Font weight for y-axis labels
          },
        },
      },
    },
    backgroundColor: 'white'
  };

  useEffect(() => {
    const root = document.querySelector(':root');
      if (root) {
        const styles = getComputedStyle(root);
        setColors({
          fillColor: `oklch(${styles.getPropertyValue('--p')} / 0.6)`,
          borderColor: `oklch(${styles.getPropertyValue('--p')})`,
          neutral: `oklch(${styles.getPropertyValue('--n')})`,
          neutralContent: `oklch(${styles.getPropertyValue('--nc')})`
        })
      }
  }, []);

  return (
    <div className='bg-base-100 h-56'>
      {
        isLoading
        ?( 
          <div className="flex items-center justify-center min-h-56">
            <span className="loading loading-ring loading-lg text-primary">
            </span>
          </div>
        )
        :<Bar className="w-full h-full" data={data} options={options}/>
      }
    </div>
  )
};

export default BarGraph;
