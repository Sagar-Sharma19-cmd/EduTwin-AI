export const getCognitiveProfile = () => {
  const rawStudyHours = localStorage.getItem('userStudyHours') || '2-4 hrs'
  const failures = parseInt(localStorage.getItem('userFailures') || '0', 10)
  
  const isLowHours = rawStudyHours.includes('1-2')
  const isHighHours = rawStudyHours.includes('4-6') || rawStudyHours.includes('6+')
  
  if (failures > 0 || isLowHours) {
    return 'weak'
  } else if (failures === 0 && isHighHours) {
    return 'strong'
  } else {
    return 'average'
  }
}

export const getNormalizedHours = () => {
  const rawStudyHours = localStorage.getItem('userStudyHours') || '2-4 hrs'
  if (rawStudyHours.includes('1-2')) return '1.5h'
  if (rawStudyHours.includes('2-4')) return '3.2h'
  if (rawStudyHours.includes('4-6')) return '5.0h'
  if (rawStudyHours.includes('6+')) return '7.2h'
  return '3.5h'
}
