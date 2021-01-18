"use strict";
const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  reverse_name: async (ctx) => {
    const { id } = ctx.params;
    const entity = await strapi.services.product.findOne({ id });
    const sanitized = sanitizeEntity(entity, {
      model: strapi.models.product,
    });
    if (typeof sanitized.name === "string")
      return sanitized.name.split("").reverse().join("");
    else throw new Error("Data in not available");
  },
};
