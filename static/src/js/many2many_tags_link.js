odoo.define("many2many_tags_link.widget", function (require) {
  "use strict";

  var core = require("web.core");
  var dialogs = require("web.view_dialogs");

  var AbstractField = require("web.AbstractField");
  var registry = require("web.field_registry");
  var relational_fields = require("web.relational_fields");

  var _t = core._t;
  var qweb = core.qweb;

  var FieldMany2ManyTagsLink = relational_fields.FieldMany2ManyTags.extend({
    tag_template: "FieldMany2ManyTagsLink",
    events: _.extend({}, AbstractField.prototype.events, {
      "click .o_delete": "_onDeleteTag",
      "click .o_external_link": "_onClickLink",
    }),

    /**
     * @private
     * @param {jQuery} element
     */
    _getBadgeId: function (element) {
      if ($(element).hasClass("badge")) return $(element).data("id");
      return $(element).closest(".badge").data("id");
    },

    /**
     * @private
     * @param {MouseEvent} ev
     */
    _onClickLink: function (ev) {
      ev.preventDefault();
      ev.stopPropagation();
      if (this.nodeOptions.force_color || ev.shiftKey) {
        return;
      }

      var self = this;
      var recordId = this._getBadgeId(ev.target);
      new dialogs.FormViewDialog(self, {
        res_model: self.field.relation,
        res_id: recordId,
        context: self.record.getContext(),
        title: _t("Open: ") + self.field.string,
        readonly: true,
      }).open();

      return;
    },
  });

  registry.add("many2many_tags_link", FieldMany2ManyTagsLink);

  return {
    FieldMany2ManyTagsLink: FieldMany2ManyTagsLink,
  };
});
