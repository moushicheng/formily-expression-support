export type Region = { start: number; end: number };
export const getRegions = (text: string): Region[] | undefined => {
  const regionReg = new RegExp(/['|"|`]\s*{{([\s\S]+?)}}\s*['|"|`]/g);
  const regionIter: IterableIterator<RegExpMatchArray> =
    text.matchAll(regionReg);
  let currentRegion = regionIter.next();
  while (currentRegion && currentRegion.done === false) {
    console.log(currentRegion);
    currentRegion = regionIter.next();
  }
  return undefined;
};
export const getCurrentRegion = (
  text: string,
  offset: number
): Region | undefined => {
  const regions = getRegions(text);
  if (!regions) return;
  for (const region of regions) {
    if (region.start <= offset && offset <= region.end) {
      return region;
    }
  }
  return undefined;
};
