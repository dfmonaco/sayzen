require "application_system_test_case"

class PwaTest < ApplicationSystemTestCase
  test "PWA manifest link is present" do
    visit root_url
    assert_selector "link[rel='manifest'][href='/manifest.json']", visible: false
  end

  test "Service Worker file is accessible" do
    visit "/service-worker.js"
    assert_text "self.addEventListener('install', (event) => {"
    assert_text "self.addEventListener('fetch', (event) => {"
  end
end
