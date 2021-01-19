"use strict";
const DateTime = require("luxon").DateTime;
const Duration = require("luxon").Duration;
const map = require("lodash").map;
const sortBy = require("lodash").sortBy;

/**
 * purchase-plugin.js controller
 *
 * @description: A set of functions called "actions" of the `purchase-plugin` plugin.
 */

module.exports = {
  /**
   * Default action.
   *
   * @return {Object}
   */

  stats: async (ctx) => {
    const knex = strapi.connections.default;

    const start = DateTime.local()
      .startOf("day")
      .minus(Duration.fromObject({ day: 7 }));

    const end = DateTime.local().endOf("day");

    const results = await knex
      .from("purchases")
      .join("products", "products.id", "purchases.product")
      .select(knex.raw("date_trunc('day', purchases.date) as date"))
      .sum("products.price as sales")
      .whereBetween("date", [start.toISO(), end.toISO()])
      .groupByRaw("date")
      .orderBy("date");

    const sales = {};

    results.forEach((result) => {
      sales[DateTime.fromJSDate(result.date).toISODate()] = result.sales;
    });

    let i = DateTime.fromJSDate(start.toJSDate());

    while (i < end) {
      const date = i.toISODate();
      if (!sales[date]) sales[date] = 0;
      i = i.plus({ day: 1 });
    }

    const value = sortBy(
      map(sales, (sales, date) => ({ date, sales })),
      "date"
    );

    console.log(value);

    ctx.send(value);
  },
};
