'use client'

import { ActiveCampaignsSection } from './_components/ActiveCampaignsSection'
import { ActiveTrainingSection } from './_components/ActiveTrainingSection'
import { AgroCopilotChat } from './_components/AgroCopilotChat'
import { HighlightsSection } from './_components/HighlightsSection'
import { ProfileSuggestionsSection } from './_components/ProfileSuggestionsSection'
import { RecentNotificationsSection } from './_components/RecentNotificationsSection'
import { RecentOrdersSection } from './_components/RecentOrdersSection'
import { RecentPostsSection } from './_components/RecentPostsSection'
import { UpcomingAuctionsSection } from './_components/UpcomingAuctionsSection'
import { WelcomeSection } from './_components/WelcomeSection'

export default function InicioDashboard() {
  return (
    <div className="relative min-h-screen bg-[#F5F7F2]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-32 pt-8 lg:px-8">
        <WelcomeSection />
        <HighlightsSection />
        <div className="grid gap-6 xl:grid-cols-[2fr,1fr]">
          <div className="space-y-6">
            <ProfileSuggestionsSection />
            <UpcomingAuctionsSection />
            <ActiveTrainingSection />
            <RecentPostsSection />
          </div>
          <div className="space-y-6">
            <RecentOrdersSection />
            <ActiveCampaignsSection />
            <RecentNotificationsSection />
          </div>
        </div>
      </div>
      <AgroCopilotChat />
    </div>
  )
}
