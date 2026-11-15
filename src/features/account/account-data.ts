export type ContributorStatus = 'verified' | 'unverified' | 'under-review'

export type CommunityReportFeedback = {
  correctVotes: number
  incorrectVotes: number
  helpfulVotes: number
}

export type AccountReport = {
  id: string
  title: string
  address: string
  reportedAt: string
  feedback: CommunityReportFeedback
}

export type AccountProfile = {
  displayName: string
  initials: string
  memberSince: string
  contributorStatus: ContributorStatus
  reports: AccountReport[]
}

export type ReportCommunityStatus = 'confirmed' | 'disputed' | 'pending'

export function getReportCommunityStatus(feedback: CommunityReportFeedback): ReportCommunityStatus {
  const evaluations = feedback.correctVotes + feedback.incorrectVotes
  if (evaluations < 5) return 'pending'
  if (feedback.correctVotes > feedback.incorrectVotes) return 'confirmed'
  if (feedback.incorrectVotes > feedback.correctVotes) return 'disputed'
  return 'pending'
}

export const demoAccount: AccountProfile = {
  displayName: 'Nguyễn An',
  initials: 'NA',
  memberSince: 'Tham gia tháng 8, 2025',
  contributorStatus: 'verified',
  reports: [
    {
      id: 'report-1',
      title: 'Ngập sâu, không thể lưu thông',
      address: 'Đường Nguyễn Hữu Cảnh, Bình Thạnh',
      reportedAt: '12/11/2025',
      feedback: { correctVotes: 14, incorrectVotes: 2, helpfulVotes: 11 },
    },
    {
      id: 'report-2',
      title: 'Nước dâng nhanh sau mưa lớn',
      address: 'Ung Văn Khiêm, Bình Thạnh',
      reportedAt: '09/11/2025',
      feedback: { correctVotes: 3, incorrectVotes: 1, helpfulVotes: 2 },
    },
    {
      id: 'report-3',
      title: 'Đường đã rút nước',
      address: 'Xô Viết Nghệ Tĩnh, Bình Thạnh',
      reportedAt: '04/11/2025',
      feedback: { correctVotes: 2, incorrectVotes: 7, helpfulVotes: 0 },
    },
  ],
}
