/*
 *
 * HomePage
 *
 */

import React, { memo, useCallback, useEffect, useState, useMemo } from "react";
// import PropTypes from 'prop-types';
import pluginId from "../../pluginId";
import { request } from "strapi-helper-plugin";
import {
  HeaderNav,
  LoadingIndicator,
  PluginHeader,
} from "strapi-helper-plugin";

const HomePage = () => {
  const [stats, setStats] = useState(null);

  const fetchStats = useCallback(async () => {
    const data = await request("/purchase-plugin/stats");
    setStats(data);
  }, []);

  useEffect(() => {
    fetchStats();
  }, []);

  const chartUrl = useMemo(() => {
    if (!stats) return null;
    const options = [];
    options.push(["cht", "bvs"]);
    options.push(["chs", "700x700"]);
    options.push([
      "chd",
      `a:${stats.map((s) => Math.round(s.sales / 100)).join(",")}`,
    ]);
    options.push(["chxl", `0:|${stats.map((s) => s.date).join("|")}`]);
    options.push(["chxt", `x,y`]);
    return `https://image-charts.com/chart?${options
      .map((o) => `${o[0]}=${o[1]}`)
      .join("&")}`;
  }, [stats]);

  return (
    <div className={"container-fluid"} style={{ padding: "18px 30px" }}>
      <PluginHeader
        title={"Synthèse des ventes"}
        description={"Chiffre d'affaire total par (7 derniers jours)"}
      />
      {chartUrl ? <img src={chartUrl} /> : <LoadingIndicator />}
    </div>
  );
};

export default memo(HomePage);
