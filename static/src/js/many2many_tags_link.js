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
      "click :not(.dropdown-toggle):not(.o_input_dropdown):not(.o_input):not(:has(.o_input)):not(.o_delete):not(:has(.o_delete))":
        "_onClickLink",
      "click .dropdown-toggle": "_onOpenColorPicker",
      "mousedown .o_colorpicker a": "_onUpdateColor",
      "mousedown .o_colorpicker .o_hide_in_kanban": "_onUpdateColor",
    }),
    // _openRelated: function (event) {
    //     event.preventDefault();
    //     event.stopPropagation();
    //     var self = this;

    //     var modelid = parseInt(event.currentTarget.getAttribute('modelid'));

    //     if (this.mode === 'readonly' && !this.noOpen && modelid) {
    //         this._rpc({
    //                 model: this.field.relation,
    //                 method: 'get_formview_action',
    //                 args: [[modelid]],
    //                 context: this.record.getContext(this.recordParams),
    //             })
    //             .then(function (action) {
    //                 self.trigger_up('do_action', {action: action});
    //             });
    //     }
    // },
    /**
     * @private
     * @param {jQuery} element
     */
    _getBadgeId: function (element) {
      if ($(element).hasClass("badge")) return $(element).data("id");
      return $(element).closest(".badge").data("id");
    },

    /**
     * @override
     */
    init: function () {
      this._super.apply(this, arguments);
      this.hasDropdown = !!this.colorField;
    },

    //--------------------------------------------------------------------------
    // Handlers
    //--------------------------------------------------------------------------

    /**
     * @private
     * @param {MouseEvent} ev
     */
    _onClickLink: function (ev) {
      ev.preventDefault();
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

      ev.stopPropagation();
      return;
    },
  });

  registry.add("many2many_tags_link", FieldMany2ManyTagsLink);

  return {
    FieldMany2ManyTagsLink: FieldMany2ManyTagsLink,
  };
});
