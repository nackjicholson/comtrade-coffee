export default function convertToTreemap(dataset, labelAttr, valueAttr) {
  return dataset.map((item) => ({ label: item[labelAttr], value: item[valueAttr] }));
}
