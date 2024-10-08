export interface EntityReference {
	entityId: string,
	name: string,
}

export default interface Ce_state {
	slug?: string,
	description?: string,
	name: string,
	c_addressCountryAbbreviation?: string,
	c_addressCountryDisplayName?: string,
	c_addressRegionAbbreviation?: string,
	c_addressRegionDisplayName?: string,
	dm_baseEntityCount?: string,
	dm_childEntityIds?: string[],
	dm_directoryChildren?: EntityReference[],
	dm_directoryChildrenCount?: string,
	dm_directoryManagerId?: string,
	dm_directoryParents?: EntityReference[],
	id: string,
}
