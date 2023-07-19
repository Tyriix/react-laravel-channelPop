import { useMemo,  } from "react";
import { Chart } from "react-google-charts";

export const options ={
    title: "Kanały",
    pieSliceText: "value"
}
export interface PieChartProps {
  channels: any[];
}
export default function PieChart({ channels }: PieChartProps){
  const chartData = useMemo(() => {
    const channelsWithoutId = channels.map(({ channelName, population }) => ({
      channelName,
      population,
    }));

    const data = [["Channel", "Population"]];
    channelsWithoutId.forEach((channel) => {
      data.push([channel.channelName, channel.population]);
    });

    return data;
  }, [channels]);
    return(
        <Chart
        chartType="PieChart"
        data={chartData}
        options={options}
        width={"100%"}
        height={"400px"}
        />
    )
}