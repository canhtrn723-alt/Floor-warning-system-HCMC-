import { demoAccount, getReportCommunityStatus } from './account-data'

function VerifiedMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M10 1.8 12.2 3l2.5-.1.9 2.3 2 1.5-.6 2.4.6 2.4-2 1.5-.9 2.3-2.5-.1-2.2 1.2-2.2-1.2-2.5.1-.9-2.3-2-1.5.6-2.4-.6-2.4 2-1.5.9-2.3 2.5.1L10 1.8Z" fill="currentColor" />
      <path d="m6.6 10 2.2 2.1 4.7-4.6" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ReportStatus({ status }: { status: ReturnType<typeof getReportCommunityStatus> }) {
  const labels = {
    confirmed: 'Cộng đồng xác nhận',
    disputed: 'Cộng đồng phản bác',
    pending: 'Chưa đủ đánh giá',
  }

  return <span className={`report-status ${status}`}>{labels[status]}</span>
}

function AccountSettingIcon({ kind }: { kind: 'bell' | 'shield' | 'settings' }) {
  if (kind === 'bell') {
    return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4" /></svg>
  }
  if (kind === 'shield') {
    return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-3 8-10V5l-8-3-8 3v7c0 7 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></svg>
  }
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" /></svg>
}

export default function AccountPage() {
  const account = demoAccount
  const confirmedReports = account.reports.filter((report) => getReportCommunityStatus(report.feedback) === 'confirmed').length
  const correctFeedback = account.reports.reduce((total, report) => total + report.feedback.correctVotes, 0)
  const helpfulFeedback = account.reports.reduce((total, report) => total + report.feedback.helpfulVotes, 0)

  return (
    <section className="app-page profile-page">
      <header className="page-header">
        <div><p>Hồ sơ & thiết lập</p><h1>Cá nhân</h1></div>
      </header>

      <p className="account-demo-note">Dữ liệu minh họa · Chưa kết nối backend hoặc tài khoản thật</p>

      <div className="profile-card">
        <div className="avatar">{account.initials}</div>
        <div className="account-identity">
          <h2>{account.displayName}</h2>
          <p>{account.memberSince}</p>
        </div>
        {account.contributorStatus === 'verified' && (
          <span className="contributor-badge"><VerifiedMark /> Đã kiểm chứng</span>
        )}
      </div>
      <p className="badge-explanation">Ghi nhận quá trình đóng góp; không đảm bảo mọi báo cáo mới đều chính xác.</p>

      <div className="contribution">
        <div><strong>{account.reports.length.toString().padStart(2, '0')}</strong><span>Báo cáo</span></div>
        <div><strong>{confirmedReports.toString().padStart(2, '0')}</strong><span>Được xác nhận</span></div>
        <div><strong className="contribution-split">{correctFeedback} / {helpfulFeedback}</strong><span>Lượt đúng / hữu ích</span></div>
      </div>

      <div className="section-title account-section-title">
        <h2>Báo cáo của tôi</h2>
        <span>Đánh giá từ cộng đồng</span>
      </div>
      <p className="report-status-note">Nhãn demo cần ít nhất 5 lượt đánh giá đúng/sai; lượt “hữu ích” được tính riêng.</p>
      <div className="account-report-list">
        {account.reports.map((report) => (
          <article className="account-report-card" key={report.id}>
            <div className="account-report-heading">
              <ReportStatus status={getReportCommunityStatus(report.feedback)} />
              <time>{report.reportedAt}</time>
            </div>
            <h3>{report.title}</h3>
            <p className="account-report-address">{report.address}</p>
            <div className="report-feedback">
              <span><b>{report.feedback.correctVotes}</b> đúng</span>
              <span><b>{report.feedback.helpfulVotes}</b> hữu ích</span>
              {report.feedback.incorrectVotes > 0 && <span><b>{report.feedback.incorrectVotes}</b> không đúng</span>}
            </div>
          </article>
        ))}
      </div>

      <h3 className="settings-title">Thiết lập trên thiết bị</h3>
      <div className="settings-list">
        <button><span><AccountSettingIcon kind="bell" /></span><div><strong>Khu vực nhận cảnh báo</strong><small>Bình Thạnh, Quận 1</small></div><b aria-hidden="true">›</b></button>
        <button><span><AccountSettingIcon kind="shield" /></span><div><strong>Quyền riêng tư</strong><small>Vị trí chỉ dùng khi cần</small></div><b aria-hidden="true">›</b></button>
        <button><span><AccountSettingIcon kind="settings" /></span><div><strong>Cài đặt ứng dụng</strong><small>Thông báo, ngôn ngữ</small></div><b aria-hidden="true">›</b></button>
      </div>
    </section>
  )
}
