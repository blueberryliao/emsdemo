/** @format */

let MenuList = [
	{
		name: 'Election Configuration',
		path: '/ElectionConfiguration',
		// path: "/ElectionConfiguration/ElectionEvents",
		meta: {
			icon: 'el-icon-s-order',
			title: 'Election Configuration'
		},
		menuLevel: 1,
		limit: ['ElectionConfiguration'],
		index: '1',
		isDeveloped: true,
		children: [
			{
				path: '/ElectionConfiguration/ElectionEvents',
				name: 'Election Events',
				meta: {
					icon: null,
					title: 'Election Events'
				},
				menuLevel: 2,
				limit: ['ElectionEvents'],
				index: '11',
				isDeveloped: true
			},
			{
				path: '/ElectionConfiguration/Precincts',
				name: 'Precincts',
				meta: {
					icon: null,
					title: 'Precincts'
				},
				menuLevel: 2,
				limit: ['Precincts'],
				index: '12',
				isDeveloped: true
			},
			{
				path: '/ElectionConfiguration/Contests',
				name: 'Contests',
				meta: {
					icon: null,
					title: 'Contests'
				},
				menuLevel: 2,
				limit: ['Contests'],
				index: '13',
				isDeveloped: true
			},
			{
				path: '/ElectionConfiguration/Candidates',
				name: 'Candidates',
				meta: {
					icon: null,
					title: 'Candidates'
				},
				menuLevel: 2,
				limit: ['Candidates'],
				index: '14',
				isDeveloped: true
			},
			{
				path: '/ElectionConfiguration/ConfigurationFiles',
				name: 'Configuration Files',
				meta: {
					icon: null,
					title: 'Configuration Files'
				},
				menuLevel: 2,
				limit: ['ConfigurationFiles'],
				index: '15',
				isDeveloped: false
			}
		]
	},
	{
		name: 'Voter Management',
		path: '/VoterManagement',
		meta: {
			icon: 'el-icon-menu',
			title: 'Voter Management'
		},
		menuLevel: 1,
		limit: ['VoterManagement'],
		index: '2',
		isDeveloped: true,
		children: null
	},
	{
		name: 'Ballot Design',
		path: '/BallotDesign',
		meta: {
			icon: 'el-icon-edit-outline',
			title: 'Ballot Design'
		},
		menuLevel: 1,
		limit: ['BallotDesign'],
		index: '3',
		isDeveloped: false,
		children: null
	},
	{
		name: 'Equipment Management',
		path: '/EquipmentManagement',
		meta: {
			icon: 'el-icon-s-management',
			title: 'Equipment Management'
		},
		menuLevel: 1,
		limit: ['EquipmentManagement'],
		index: '4',
		isDeveloped: true,
		children: null
	},
	{
		name: 'Ballot Counting',
		path: '/BallotCounting',
		meta: {
			icon: 'el-icon-s-data',
			title: 'Ballot Counting'
		},
		menuLevel: 1,
		limit: ['BallotCounting'],
		index: '5',
		isDeveloped: true,
		children: [
			{
				path: '/BallotCounting/BallotAdjudication',
				name: 'Ballot Adjudication',
				meta: {
					icon: null,
					title: 'Ballot Adjudication'
				},
				menuLevel: 2,
				limit: ['Ballot Adjudication'],
				index: '51',
				isDeveloped: true
			},
			{
				path: '/BallotCounting/Write-inAsignment',
				name: 'Write-in Asignment',
				meta: {
					icon: null,
					title: 'Write-in Asignment'
				},
				menuLevel: 2,
				limit: ['Write-in Asignment'],
				index: '52',
				isDeveloped: false
			},
			{
				path: '/BallotCounting/DataCenter',
				name: 'Data Center',
				meta: {
					icon: null,
					title: 'Data Center'
				},
				menuLevel: 2,
				limit: ['DataCenter'],
				index: '53',
				isDeveloped: true
			}
		]
	},
	{
		name: 'Election Report',
		path: '/ElectionReport',
		meta: {
			icon: 'el-icon-tickets',
			title: 'Election Report'
		},
		menuLevel: 1,
		limit: ['ElectionReport'],
		index: '6',
		isDeveloped: false,
		children: null
	},
	{
		name: 'System Administration',
		path: '/SystemAdministration',
		meta: {
			icon: 'el-icon-s-custom',
			title: 'System Administration'
		},
		menuLevel: 1,
		limit: ['SystemAdministration'],
		index: '7',
		isDeveloped: true,
		children: [
			{
				path: '/SystemAdministration/User',
				name: 'User',
				meta: {
					icon: null,
					title: 'User'
				},
				menuLevel: 2,
				limit: ['User'],
				index: ' 71',
				isDeveloped: true
			},
			{
				path: '/SystemAdministration/UserAuthority',
				name: 'User Authority',
				meta: {
					icon: null,
					title: 'User Authority'
				},
				menuLevel: 2,
				limit: ['UserAuthority'],
				index: '72',
				isDeveloped: true
			},
			{
				path: '/SystemAdministration/AuditLog',
				name: 'Audit Log',
				meta: {
					icon: null,
					title: 'Audit Log'
				},
				menuLevel: 2,
				limit: ['AuditLog'],
				index: '73',
				isDeveloped: false
			}
		]
	},
	{
		name: 'Help',
		path: '/Help',
		meta: {
			icon: 'el-icon-help',
			title: 'Help'
		},
		menuLevel: 1,
		limit: ['Help'],
		index: '8',
		isDeveloped: false,
		children: [
			{
				path: '/Help/UserManual',
				name: 'User Manual',
				meta: {
					icon: null,
					title: 'User Manual'
				},
				menuLevel: 2,
				limit: ['UsUserManualer'],
				index: '81',
				isDeveloped: false
			}
		]
	}
];

export default MenuList;
