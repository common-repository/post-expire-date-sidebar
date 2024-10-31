( function( wp ) {
    var registerPlugin = wp.plugins.registerPlugin;
    var PluginSidebar = wp.editPost.PluginSidebar;
    var el = wp.element.createElement;
	var DateControl = wp.components.DateTimePicker;
	var SelectControl = wp.components.SelectControl;
	var ToggleControl = wp.components.ToggleControl;
	var HorizontalRule = wp.components.HorizontalRule;
	var Panel = wp.components.Panel;
	var PanelBody = wp.components.PanelBody;
	var PanelRow = wp.components.PanelRow;
	
	var withSelect = wp.data.withSelect;
	var withDispatch = wp.data.withDispatch;
 
	var date= new Date();
 
 

var MetaToggleControl = wp.compose.compose(
	withDispatch( function( dispatch, props ) {
		return {
			setMetaValue: function( metaValue ) {
				dispatch( 'core/editor' ).editPost(
					{ meta: { sidebar_toogle: metaValue } }
				);
			}
		}
	} ),
	withSelect( function( select, props ) {
		return {
			metaValue: select( 'core/editor' ).getEditedPostAttribute( 'meta' )[ 'sidebar_toogle' ],
		}
	} ) )( function( props ) {
		return el( ToggleControl, {
			label: 'Expire post',
			checked: props.metaValue,
			onChange: function( content ) {
				props.setMetaValue( content );
			},
		});
	}
);

/*SELECTION*/
var MetaTypeSelection = wp.compose.compose(
	withDispatch( function( dispatch, props ) {
		return {
			setMetaValue: function( metaValue ) {
				dispatch( 'core/editor' ).editPost(
					{ meta: { [ props.metaKey ]: metaValue } }
				);
			}
		}
	} ),
	withSelect( function( select, props ) {
		return {
			metaValue: select( 'core/editor' ).getEditedPostAttribute( 'meta' )[ props.metaKey ],
		}
	} ) )( function( props ) {
		return el( SelectControl, {
			label: props.title,
			options: 				[
				{ label: 'Draft', value: 'draft' },
				{ label: 'Trash', value: 'trash' },
				{ label: 'Private', value: 'private' },
			],
			onChange: function( content ) {
				props.setMetaValue( content );
			},
			value: props.metaValue,
		});
	}
);


/*DATE PICKER*/

var MetaTypeDate = wp.compose.compose(
	withDispatch( function( dispatch, props ) {
		return {
			setMetaValue: function( metaValue ) {
				/*metaValue = metaValue.replace('T',' ');*/
				dispatch( 'core/editor' ).editPost(
					{ meta: { [ props.metaKey ]: metaValue } }
				);
			}
		}
	} ),
	withSelect( function( select, props ) {
		return {
			metaValue: select( 'core/editor' ).getEditedPostAttribute( 'meta' )[ props.metaKey ],
		}
	} ) )( function( props ) {
		return el( DateControl, {
			label: props.title,
			onChange: function( content ) {
				props.setMetaValue( content );
			},
			currentDate: props.metaValue,
		});
	}
);

 
 
    registerPlugin( 'my-plugin-sidebar', {
        render: function() {
            return el( PluginSidebar,
                {
                    name: 'my-plugin-sidebar',
                    icon: 'calendar-alt',
                    title: 'Set Post Expiration',
                },
                el( 'div',
                    { className: 'plugin-sidebar-content' },

					el( MetaToggleControl ),
					
					el (MetaTypeSelection,
						{ 			metaKey: 'sidebar_drop', 
									title: 'Post Status on expire',
						}
						
					),
					
					el( HorizontalRule ),
					el(MetaTypeDate,  
						{ 			metaKey: 'sidebar_date', 
									title: 'Date to expire',
						}
					),					
					
                )
            );
        }
    } );
} )( window.wp );