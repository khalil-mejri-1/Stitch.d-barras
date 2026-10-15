<?php
// Set headers for XML output
header('Content-Type: application/xml; charset=utf-8');

$baseUrl = "https://stitch-debarras.com";
$currentDate = date('Y-m-d');

$pages = [
    ['loc' => '/', 'changefreq' => 'daily', 'priority' => '1.0'],
    ['loc' => '/services', 'changefreq' => 'weekly', 'priority' => '0.9'],
    ['loc' => '/debarras-syndrome-diogene', 'changefreq' => 'weekly', 'priority' => '0.9'],
    ['loc' => '/prices', 'changefreq' => 'weekly', 'priority' => '0.8'],
    ['loc' => '/pro-space', 'changefreq' => 'weekly', 'priority' => '0.8'],
    ['loc' => '/quote-request', 'changefreq' => 'weekly', 'priority' => '0.8'],
    ['loc' => '/booking', 'changefreq' => 'weekly', 'priority' => '0.7'],
    ['loc' => '/blog', 'changefreq' => 'weekly', 'priority' => '0.7'],
    ['loc' => '/about', 'changefreq' => 'monthly', 'priority' => '0.6'],
    ['loc' => '/contact', 'changefreq' => 'monthly', 'priority' => '0.7'],
];

echo '<?xml version="1.0" encoding="UTF-8"?>' . PHP_EOL;
?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<?php foreach ($pages as $page): ?>
  <url>
    <loc><?php echo htmlspecialchars($baseUrl . $page['loc']); ?></loc>
    <lastmod><?php echo $currentDate; ?></lastmod>
    <changefreq><?php echo $page['changefreq']; ?></changefreq>
    <priority><?php echo $page['priority']; ?></priority>
  </url>
<?php endforeach; ?>
</urlset>
