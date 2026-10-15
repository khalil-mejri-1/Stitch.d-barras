<?php
// Set headers for XML output
header('Content-Type: application/xml; charset=utf-8');

$baseUrl = "https://stitch-debarras.com";
$currentDate = date('Y-m-d\TH:i:sP');

$pages = [
    ['loc' => '/', 'priority' => '1.0000'],
    ['loc' => '/services', 'priority' => '0.8000'],
    ['loc' => '/prices', 'priority' => '0.8000'],
    ['loc' => '/booking', 'priority' => '0.8000'],
    ['loc' => '/quote-request', 'priority' => '0.8000'],
    ['loc' => '/about', 'priority' => '0.8000'],
    ['loc' => '/blog', 'priority' => '0.8000'],
    ['loc' => '/contact', 'priority' => '0.8000'],
    ['loc' => '/pro-space', 'priority' => '0.8000'],
    ['loc' => '/debarras-syndrome-diogene', 'priority' => '0.5120'],
];

echo '<?xml version="1.0" encoding="UTF-8"?>' . PHP_EOL;
?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
<?php foreach ($pages as $page): ?>
  <url>
       <loc><?php echo htmlspecialchars($baseUrl . $page['loc']); ?></loc>
       <lastmod><?php echo $currentDate; ?></lastmod>
       <priority><?php echo $page['priority']; ?></priority>
  </url>
<?php endforeach; ?>
</urlset>
