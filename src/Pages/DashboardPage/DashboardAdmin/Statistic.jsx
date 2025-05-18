import {
    PieChart, Pie, Legend, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"];

const getPath = (x, y, width, height) => {
    return `M${x},${y + height}
      C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2
        },${y}
      C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width
        },${y + height}
      Z`;
};

const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const Statistics = (props) => {
    const { stats } = props || {};
    const {
        totalBioData = 0,
        totalMale = 0,
        totalFemale = 0,
        totalPremiumBioData = 0,
        totalRevenue = 0,
    } = stats;

    const chartData = [
        { name: "Total Biodata", value: totalBioData },
        { name: "Male", value: totalMale },
        { name: "Female", value: totalFemale },
        { name: "Premium", value: totalPremiumBioData },
        { name: "Revenue", value: totalRevenue },
    ];

    return (
        <div className="flex bg-white mt-8 py-4 gap-4 flex-wrap justify-center">
            <div className="flex-1 min-w-[300px] flex flex-col items-center">
                <BarChart
                    width={320}
                    height={400}
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Legend />
                    <Bar
                        dataKey="value"
                        fill="#8884d8"
                        shape={<TriangleBar />}
                        label={{ position: "top" }}
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={colors[index % colors.length]}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </div>

            <div className="flex-1 min-w-[300px] flex flex-col items-center">
                <PieChart width={300} height={400}>
                    <Legend />
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={colors[index % colors.length]}
                            />
                        ))}
                    </Pie>
                </PieChart>
            </div>
        </div>
    );
};

export default Statistics;
