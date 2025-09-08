// BMI 计算器插件 - 客户端工具函数
export default defineNuxtPlugin(() => {
  return {
    provide: {
      // BMI 计算函数
      calculateBMI: (weight: number, height: number, isMetric: boolean = true) => {
        let heightInMeters: number
        let weightInKg: number
        
        if (isMetric) {
          heightInMeters = height / 100
          weightInKg = weight
        } else {
          // 英制转公制
          heightInMeters = height * 0.0254
          weightInKg = weight * 0.453592
        }
        
        return weightInKg / (heightInMeters * heightInMeters)
      },
      
      // 获取 BMI 分类
      getBMICategory: (bmi: number) => {
        if (bmi < 18.5) {
          return { label: 'Underweight', color: 'blue', range: 'Below 18.5' }
        } else if (bmi < 25) {
          return { label: 'Normal weight', color: 'green', range: '18.5 - 24.9' }
        } else if (bmi < 30) {
          return { label: 'Overweight', color: 'yellow', range: '25.0 - 29.9' }
        } else {
          return { label: 'Obese', color: 'red', range: '30.0 and above' }
        }
      },
      
      // 保存 BMI 历史记录
      saveBMIHistory: (result: any) => {
        if (process.client) {
          const history = JSON.parse(localStorage.getItem('bmi-history') || '[]')
          history.unshift({
            ...result,
            date: new Date().toISOString()
          })
          localStorage.setItem('bmi-history', JSON.stringify(history.slice(0, 10)))
        }
      },
      
      // 获取 BMI 历史记录
      getBMIHistory: () => {
        if (process.client) {
          return JSON.parse(localStorage.getItem('bmi-history') || '[]')
        }
        return []
      }
    }
  }
})
