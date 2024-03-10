/* eslint-disable no-unused-vars */
import { MdOutlineFavorite } from "react-icons/md";
import { BiSolidCommentDetail } from "react-icons/bi";
import { MdDateRange } from "react-icons/md";
import { FcManager } from "react-icons/fc";
import { Link } from "react-router-dom";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { Bar } from "recharts";
// import Revenue from "./Revenue/Revenue";
// import Analytic from "./Revenue/Analytic/Analytic";

const UserHome = () => {

    const data = [
        { name: "Students", value: 400 },
        { name: "Teachers", value: 300 },
    ];

    const COLORS = ["#0088FE", "#00C49F"];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index,
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

    return (

        <div className="" >
            <div className="">
                <div className="flex-1">
                    <section className="  ">
                        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
                            <div className="mx-auto max-w-3xl text-center">
                                <h2 className="  headtext__cormorant">
                                    TOtal Overview Businesses
                                </h2>

                                <p className="mt-4 p__opensans">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Ratione dolores laborum labore provident impedit esse
                                    recusandae facere libero harum sequi.
                                </p>
                            </div>

                            <div className="mt-8 sm:mt-12">
                                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
                                        <dt className="order-last text-lg font-medium p__opensans">
                                            Total Sales
                                        </dt>

                                        <dd className="text-4xl font-extrabold text-first md:text-5xl">
                                            $4.8m
                                        </dd>
                                    </div>

                                    <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
                                        <dt className="order-last p__opensans">Total Teacher</dt>

                                        <dd className="text-4xl font-extrabold text-first md:text-5xl">
                                            24
                                        </dd>
                                    </div>

                                    <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center  ">
                                        <dt className="order-last  p__opensans">Total Students</dt>

                                        <dd className="text-4xl font-extrabold text-first md:text-5xl">
                                            86
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </section>
                </div>
                {/* chats  */}
                <div className="flex">
                    <div className="flex-1">
                        <div style={{ width: "100%", height: 300 }}>
                            <ResponsiveContainer>
                                <PieChart width={400} height={400}>
                                    <Pie
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {data.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[index % COLORS.length]}
                                            />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex justify-center p__opensans gap-4">
                            <p>User</p>{" "}
                            <button className="px-1 py-2 bg-[#0088FE]"></button>
                            <p>Imployee</p>{" "}
                            <button className="px-1 py-2 bg-[#00C49F]"></button>
                        </div>
                    </div>
                    {/* <div className="flex-1">
                        <Revenue></Revenue>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default UserHome;
