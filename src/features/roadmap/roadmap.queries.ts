import { useQuery } from '@tanstack/react-query'
import { fetchRoadmap } from './roadmap.api'
import { roadmapKeys } from './roadmap.keys'
export function useRoadmap(){ return useQuery({queryKey:roadmapKeys.project('aqarati-roadmap'),queryFn:fetchRoadmap,refetchInterval:60_000}) }
