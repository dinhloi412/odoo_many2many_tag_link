# -*- coding: utf-8 -*-
{
    'name': "many2many_tag_link",
    'category': 'Uncategorized',
    'version': '0.1',
    # any module necessary for this one to work correctly
    'depends': ['base'],
    # always loaded
     'assets': {
        'web.assets_backend': [
            'many2many_tag_link/static/src/js/many2many_tags_link.js',
        ],
        'web.assets_qweb': [
            'many2many_tag_link/static/src/xml/template.xml',
        ],
    },
    # only loaded in demonstration mode
    'installable': True,
    'auto_install': False,
    'application': False
}
